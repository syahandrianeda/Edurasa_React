import * as XLSX from 'xlsx';
import type { ExcelParseResult } from "./import-excel";
import { headerMapDapodik } from './detect-header-excel';
import type { HeadingTableType, KeyModelTable, ThType } from '~/components/tabels/table-interface';
import type { SiswaTypeDapodik } from '~/types/siswa-dapodik';
import { DTOSiswaFileDapodik } from '~/dtos/dto-siswa-file-dapodik';

export type cellColspan={
  key:string,
  levelIndex:number,
  coloumnCount:number,
  keyApp:string,
  memberColspan:string[]
  mainMember:string
}

export type typeImportDapodik<T = Record<string, unknown>> ={
  formDapodik:SiswaTypeDapodik[],
  propertyDapodik:HeadingTableType<SiswaTypeDapodik>[],
  tampilan?:string
  configRender:KeyModelTable<T>[]
}
/**
 * key untuk menggenarate data key SiswaType
 * 
 */
export type HeaderDapodikToKeySiswaType={
    key:string,
    label:string;
    keyXlsx:string,
    value?:any
}

function normalizeExcelValue(value: any): string {
  return String(value ?? '')
    .replace(/[\r\n]+/g, ' ') // ⬅️ gabung baris jadi spasi
    .replace(/\s+/g, ' ')     // rapikan spasi berlebih
    .trim()
    ;
}

type tagNull = {
  column:number,
  key:string,
  keyJson:string,
  valueJson?:any
}
const CellParentDapodik:cellColspan[] = [
  {
    key: 'data ayah',
    levelIndex:0,
    coloumnCount:6,
    keyApp:'pd_namaayah',
    memberColspan:['nama','tahun lahir', 'jenjang pendidikan', 'pekerjaan', 'penghasilan', 'nik'],
    mainMember:'nama'
  },{
    key: 'data ibu',
    levelIndex:0,
    coloumnCount:6,
    keyApp:'pd_namaibu',
    memberColspan:['nama','tahun lahir', 'jenjang pendidikan', 'pekerjaan', 'penghasilan', 'nik'],
    mainMember:'nama'
  },{
    key: 'data wali',
    levelIndex:0,
    coloumnCount:6,
    keyApp:'dapo_namawali',
    memberColspan:['nama','tahun lahir', 'jenjang pendidikan', 'pekerjaan', 'penghasilan', 'nik'],
    mainMember:'nama'
  },
];

function CollectionTh(row:Record<string, unknown>,maxRow:number,firstLevel:boolean): {koleksiTH:ThType<SiswaTypeDapodik>[],configRender:KeyModelTable<SiswaTypeDapodik>[], dataSheet:HeaderDapodikToKeySiswaType[]}{
  const koleksiTH:ThType<SiswaTypeDapodik>[]=[];
  const configRender:KeyModelTable<SiswaTypeDapodik>[]=[];
  const dataSheet:HeaderDapodikToKeySiswaType[]=[]
  const rowHasColspan = CellParentDapodik.map(s=>({countColumn:s.coloumnCount, key:s.key}));
  let indexColspan = 0;
  let countSelHasTag = 0
  Object.entries(row).forEach(([k,v],i)=>{
    let tagGroup:string = '';

    if(v){
      const serialize = normalizeExcelValue(v)
      const findKeyApp = headerMapDapodik.find(s=> !s.groupColumn && s?.aliases.includes(serialize.toLowerCase()));
      const findGroup = CellParentDapodik.find(s=>s.key === serialize.toLowerCase());
      
      tagGroup = findGroup? findGroup.key: tagGroup;

        let Th:ThType<SiswaTypeDapodik> = {
                  label: serialize,
                  rowSpan:findGroup?1:maxRow,
                  colSpan:findGroup?.coloumnCount || 1
            }
            
        koleksiTH.push(Th);

        if(findGroup){

            findGroup?.memberColspan.forEach(key=>{
              const keyName = findGroup.key +' '+ key;
              const keyAppGroup = headerMapDapodik.find(s=> s?.aliases.includes(keyName));
              
              if(keyAppGroup){
                configRender.push(keyAppGroup?.configRender);
                
              }
            })
            
            
        }

        if(findKeyApp){
          configRender.push(findKeyApp?.configRender);
        }
        
        let objKey:HeaderDapodikToKeySiswaType={
          key: findKeyApp? findKeyApp.key : findGroup? findGroup.keyApp : `unknown_${i}`,
          label: serialize, 
          keyXlsx: k
        };

        if(!firstLevel){
          const colCount = rowHasColspan[indexColspan].countColumn;
          tagGroup = rowHasColspan[indexColspan].key;
          
          const keyName = tagGroup +' '+ serialize.toLowerCase();
          const findNextKeyApp = headerMapDapodik.find(s=> s.groupColumn === tagGroup && s?.aliases.includes(keyName));
          if(findNextKeyApp){
            objKey.key = findNextKeyApp.key;
          }else{
            objKey.key = `unknown_${i}`;
          }
          objKey.label = keyName;
          
          countSelHasTag++;
          if(countSelHasTag === colCount){
            indexColspan++;
            countSelHasTag=0;
          }
        }
        dataSheet.push(objKey); 
      }
    
  })
  
  return {koleksiTH,configRender, dataSheet}
}

export function createDataResultImportDapodik(
  rows: Record<string, any>[],
  predicatedFirstKey: string[],
  maxRowHEader?: number
) {
const predicates = predicatedFirstKey.map(v =>  normalizeExcelValue(v));
    const maxRow = maxRowHEader?? 2;
    const keyAppFromDapodik: HeaderDapodikToKeySiswaType[]=[];
    const ArrayHeaderUI:HeadingTableType<SiswaTypeDapodik>[]=[];
    const ArrayData:Record<string, any>[]=[];//SiswaTypeDapodik[]=[];
    const ConfigToRender:KeyModelTable<SiswaTypeDapodik>[]=[]
    let indexHeader = 0;
    let startCollect:boolean=false;
    let startCreateKeyHeader:boolean = false;
    
    /** loop seluruh data hasil import */
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        const row = rows[rowIndex];

        /** found: cari dulu prediksi header dari kata kunci predicatedFirstKey */
        const found = Object.entries(row).find(([_, value]) => {
              if (value === null || value === undefined) return false;
              return predicates.includes( normalizeExcelValue(value));
            });
        /** apakah baris ini sudah mulai buat CreateKeyHeader */
        if(startCreateKeyHeader){
          /** tandai kita akan buat indexHeader */
          indexHeader++;
          const {koleksiTH,dataSheet} = CollectionTh(row, maxRow, false);
              ArrayHeaderUI.push(
                {
                  columns:koleksiTH
                });
                
              
              keyAppFromDapodik.push(...dataSheet);
        }
        if(found){

          /** sediakan array sel di baris ini. found adalah data baris pertama dari predicatedKey*/

              /** Kita akan buat key  untuk HEADER tabel ata untuk mengisi component TH */
              const {koleksiTH,configRender,dataSheet} = CollectionTh(row, maxRow,true)
              /** KoleksiTH di baris pertama yang ditemukan ini (Found) dijadikan KeyHeader */
              ArrayHeaderUI.push(
                {
                  columns:koleksiTH
                });
              ConfigToRender.push(...configRender);
              keyAppFromDapodik.push(...dataSheet);
              
              /** arrayHeader telah dibuat di baris pertama, selanjutnya tandai di indexHeader */
              indexHeader++;

              /** buat triger startCreateHeader untu dimulai */
              startCreateKeyHeader = true;
        }
        
        /** setelah createHeader telah dibuat, pastikan startCreateKeyHeader diakhir */
        if(startCollect){
          
          let dataSiswa = {};
          keyAppFromDapodik.forEach(({key,keyXlsx})=>{
            // if(key === 'index') return;
            dataSiswa = {...dataSiswa, [key]:row[keyXlsx]}
          });
          ArrayData.push(dataSiswa);
        }

        if(maxRow === indexHeader){
            /** jika sudah sama jumlah row-nya, maka selesai mencari header. Kita ubah nilai startCreateHeader */
            startCreateKeyHeader = false;
            startCollect=true
          }
      };

    return {ArrayHeaderUI, ArrayData, ConfigToRender}
}


export function readExcelFileToJsonDapodik(
  file: File
): Promise<ExcelParseResult<SiswaTypeDapodik>> {
  return new Promise((resolve, reject) => {
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ];

    if (!allowedTypes.includes(file.type)) {
      reject(new Error('File harus berupa Excel (.xls atau .xlsx)'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const json = XLSX.utils.sheet_to_json(worksheet, {
          defval: null, // cell kosong → null (penting!)
          raw: false,
        });
        
        const {ArrayData, ArrayHeaderUI, ConfigToRender} = createDataResultImportDapodik(json as Record<string, any>[],['no', 'No.','No'],2);
        
        resolve({
          sheetName,
          data: DTOSiswaFileDapodik.fromApiArray(ArrayData),//json as unknown as T[],
          property:ArrayHeaderUI,
          render:ConfigToRender

        });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Gagal membaca file'));
    };

    reader.readAsArrayBuffer(file);
  });
}


