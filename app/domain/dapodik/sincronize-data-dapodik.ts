import { validateSiswaList, type SiswaWithValidation, type validationType } from "~/context-reduct/selectores/data-siswa-aktif";
import type { SiswaType } from "~/types/siswa";
import type { SiswaTypeDapodik } from "~/types/siswa-dapodik";
import type { typeImportDapodik } from "../../infrastructures/excels/detect-header-dapodik";
import type { HeadingTableType, KeyModelTable } from "~/components/tabels/table-interface";
import { DTOSiswa } from "~/dtos/dto-siswa";
import { getNumberFromString } from "~/lib/get-number";

type resultDataSyncronize<SiswaType> = {
    key: string,
    label:string,
    dataDapodik: SiswaType,
    dataAplikasi: SiswaType,
    hasInvalidAplikasi: validationType
}
export interface DataCompareAplikasi extends SiswaWithValidation {
    dataCompare: SiswaType[]
}
export interface DataCompareDapodik extends SiswaWithValidation {
    dataCompare: SiswaTypeDapodik[]
}
type levelCompare = 'satu'|'dua'|'tiga'|'empat'|'lima'|'enam'|'tujuh'|'delapan'|'sembilan'|'sepuluh'|'sebelas'|'duabelas'|'tigabelas'|'tidak ditemukan';
export interface DataCompareValidAppWithDapodik extends DataCompareDapodik{
    level:levelCompare
    description:string,
    countDapodik:number
}
export interface HydrateValidationResult {
  isValid: boolean;

  errors: {
    nis?: string| number;
    nisn?: string| number;
  };

  duplicate: {
    nis?: number;
    nisn?: number;
  };

  data: SiswaWithValidation[];
}

type resultDataHydrate = 
{
    key: string;
    label: string;
    dataDapodik: number | string;
    dataAplikasi: number | string;
    hasInvalidAplikasi: HydrateValidationResult;
};
export class SincronizeDapodik{

    public formDapodik: SiswaTypeDapodik[];
    public siswaTypeFromDapodik: SiswaType[];
    
    public propertyDapodik: HeadingTableType<SiswaTypeDapodik>[];
    public configRender: KeyModelTable<SiswaTypeDapodik>[];
    public SiswaImportWithValidation: SiswaWithValidation[];

    constructor(private dataImport:typeImportDapodik<SiswaTypeDapodik>, private dataAplikasi:SiswaWithValidation[]){
        this.formDapodik = dataImport.formDapodik;
        this.siswaTypeFromDapodik = DTOSiswa.fromApiArray(dataImport.formDapodik);
        this.SiswaImportWithValidation = validateSiswaList(this.siswaTypeFromDapodik);
        
        this.propertyDapodik = dataImport.propertyDapodik;
        this.configRender = dataImport.configRender;
    }

    dataSincronize(){
        return {
            hanyaAdaDiDapodik: this.hanyaAdaDiDapodik(),
            hanyaAdaDiAplikasi: this.hanyaAdaDiAplikasi()
        }
    }
    hydrateDataSincronize():resultDataHydrate[]{
        
        return [
            {
                key: 'total-data-dapodik',
                label: 'Total Data Import Dapodik',
                dataDapodik: this.SiswaImportWithValidation.length,
                dataAplikasi: '',
                hasInvalidAplikasi: this.SiswaImportWithValidation.filter(siswa=>!siswa.validation.isValid).length > 0 ? { 
                    isValid: false, 
                    errors:{nis:this.SiswaImportWithValidation.filter(siswa=>!siswa.validation.errors).length.toString()}, 
                    duplicate:{
                        nis:this.SiswaImportWithValidation.filter(siswa=>!siswa.validation.duplicate.nis?.withIds).length,
                        nisn:this.SiswaImportWithValidation.filter(siswa=>!siswa.validation.duplicate.nisn?.withIds).length, 
                    },
                    data: this.SiswaImportWithValidation.filter(siswa=>!siswa.validation.isValid)
                } : {
                    isValid: true, errors:{}, duplicate:{}, data: []
                } 
            },{
                key: 'total-data-aplikasi',
                label: 'Total Data Siswa di Aplikasi',
                dataDapodik: '',
                dataAplikasi: this.siswaAktifApliasi.length,
                hasInvalidAplikasi: this.siswaAktifApliasi.filter(siswa=>!siswa.validation.isValid).length > 0 ? { 
                    isValid: false, 
                    errors:{nis:this.siswaAktifApliasi.filter(siswa=>!siswa.validation.errors).length}, 
                    duplicate:{
                        nis:this.siswaAktifApliasi.filter(siswa=>!siswa.validation.duplicate.nis).length,
                        nisn:this.siswaAktifApliasi.filter(siswa=>!siswa.validation.duplicate.nisn).length, 
                    },
                    data: this.siswaAktifApliasi.filter(siswa=>!siswa.validation.isValid)
                } : {
                    isValid: true, errors:{}, duplicate:{},data: []
                }   
            },
            {
                key: 'hanya-ada-di-dapodik',
                label: 'Hanya Ada di Dapodik',
                dataDapodik: this.hanyaAdaDiDapodik().length,
                dataAplikasi: '',
                hasInvalidAplikasi: {isValid: false, errors:{}, duplicate:{}, data: this.hanyaAdaDiDapodik()}
            },
            {
                key: 'hanya-ada-di-aplikasi',
                label: 'Hanya Ada di Aplikasi',
                dataDapodik: '',
                dataAplikasi: this.hanyaAdaDiAplikasi().length,
                hasInvalidAplikasi: {isValid: false, errors:{}, duplicate:{}, data: this.hanyaAdaDiAplikasi()}    
            }
        ]
    }
    get siswaAktifApliasi():SiswaWithValidation[]{
        return this.dataAplikasi.filter(siswa=> siswa.data.aktif === 'aktif');
    }

    hanyaAdaDiDapodik():SiswaWithValidation[]{
        const hanyaDapodik = this.SiswaImportWithValidation.filter(dapodik=>{
                    const adaDiAplikasi = this.siswaAktifApliasi.find(aplikasi=> aplikasi.data.pd_nama.toLowerCase() === dapodik.data.pd_nama.toLowerCase());
                    return !adaDiAplikasi;
                });

        return hanyaDapodik;
    }

    hanyaAdaDiAplikasi():SiswaWithValidation[]{
        const hanyaAplikasi = this.siswaAktifApliasi.filter(aplikasi=>{
                    const adaDiDapodik = this.formDapodik.find(dapodik=> dapodik.pd_nama.toLowerCase() === aplikasi.data.pd_nama.toLowerCase());
                    return !adaDiDapodik;
                }); 
        return hanyaAplikasi;
    }
    hanyaAdaDiDapodiDibandingkanAplikasi(): DataCompareAplikasi[]{  
        const dataHanyaDapodik = this.hanyaAdaDiDapodik();
        const createDataCompare:DataCompareAplikasi[] = [];
        dataHanyaDapodik.forEach(dapodik=>{
            
            const dataCompare = this.dataAplikasi.filter(dapodikAplikasi=> 
            (dapodikAplikasi.data.pd_nama.toLowerCase().split(' ').includes(dapodik.data.pd_nama.toLowerCase().split(' ')[0]) &&
            dapodikAplikasi.data.pd_namaibu.toLowerCase() === dapodik.data.pd_namaibu.toLowerCase()) || dapodikAplikasi.data.nisn === dapodik.data.nisn
            );
            const newObjek = {...dapodik, dataCompare: dataCompare.map(d=>d.data)};
            createDataCompare.push(newObjek);
        });
        return createDataCompare;
    }
    hanyaAdaDiAplikasiDibandingkanDapodik(): DataCompareDapodik[]{  
        const dataHanyaDapodik = this.hanyaAdaDiAplikasi();
        const createDataCompare:DataCompareDapodik[] = [];
        dataHanyaDapodik.forEach(dapodik=>{
            
            const dataCompare = this.formDapodik.filter(dapodikAplikasi=> 
                (dapodikAplikasi.pd_nama.toLowerCase().split(' ').includes(dapodik.data.pd_nama.toLowerCase().split(' ')[0]) ||
            dapodikAplikasi.pd_namaibu.toLowerCase() === dapodik.data.pd_namaibu.toLowerCase()) && dapodikAplikasi.nisn === dapodik.data.nisn
            );
            const dataComparePredictable = this.formDapodik.filter(dapodikAplikasi=> 
                (dapodikAplikasi.pd_nama.toLowerCase().split(' ').includes(dapodik.data.pd_nama.toLowerCase().split(' ')[1]) ||
            dapodikAplikasi.pd_namaibu.toLowerCase() === dapodik.data.pd_namaibu.toLowerCase()) || dapodikAplikasi.nisn === dapodik.data.nisn
            );

            const newObjek = {...dapodik, dataCompare: dataCompare.length ===0? dataComparePredictable : dataCompare    };
            createDataCompare.push(newObjek);
        });
        return createDataCompare;
    }
    get dataAplikasiInvalid(){
        return this.siswaAktifApliasi.filter(siswa=>!siswa.validation.isValid);
    }
    
    dataValidationSiswaWithDapodikSheet(rombel:string):DataCompareValidAppWithDapodik[] {
        const siswaAktif = this.siswaAktifApliasi.filter(s=> s.data.nama_rombel === rombel && s.data.jenjang === getNumberFromString(rombel));
        return siswaAktif.map(({data, validation},i)=>{
            let level:levelCompare = 'tidak ditemukan';
            let description: string = 'Tidak ada di Dapodik';
            let dataCompareState:SiswaTypeDapodik[]=[];
            /** nama, ibu, dan nisn sama semua */
            const findLevelSatu = this.formDapodik.find(s=>
                s.pd_nama.toLowerCase() === data.pd_nama.toLowerCase() &&
                s.nisn === data.nisn &&
                s.pd_namaibu.toLowerCase() === data.pd_namaibu.toLowerCase()
            );

            /** nama siswa ada tapi beda, ibu ada dan sama,  dan nisn sama 
             * ketiganya potensi sama
            */
            const findLevelDua = this.formDapodik.filter(s=>
                s.pd_nama.toLowerCase().split(' ').includes(data.pd_nama.toLowerCase().split(' ')[1]) && 
                s.pd_namaibu.toLowerCase() === data.pd_namaibu.toLowerCase() &&
                s.nisn === data.nisn 
            );

            /** nama siswa ada dan sama, ibu ada tapi beda, nisn sama 
             * ketiganya potensi sama
            */
            const findLevelTiga = this.formDapodik.filter(s=>
                    s.pd_nama.toLowerCase() === data.pd_nama.toLowerCase() && 
                    s.pd_namaibu.toLowerCase().split(' ').includes(data.pd_namaibu.toLowerCase().split(' ')[0]) &&
                    s.nisn === data.nisn 
            )

            /** nama siswa dan ibu pasti sama,  dan nisn beda 
             * nama dan ibu potensi sama, nisn beda
            */
            const findLevelEmpat = this.formDapodik.filter(s=>
                    s.pd_nama.toLowerCase() === data.pd_nama.toLowerCase() &&
                    s.pd_namaibu.toLowerCase() === data.pd_namaibu.toLowerCase() &&
                    s.nisn !== data.nisn
            )
            
            /** nama dan nisn pasti sama, ibu beda 
             *  nama dan ibu potensi sama, nisn beda
            */
            const findLevelLima = this.formDapodik.filter(s=>
                    s.pd_nama.toLowerCase().split(' ').includes(data.pd_nama.toLowerCase().split(' ')[1]) &&
                    s.pd_namaibu.toLowerCase() === data.pd_namaibu.toLowerCase() &&
                    s.nisn !== data.nisn
            )

            /**
             *  nama dan ibu potensi sama, nisn beda
             */
            const findLevelEnam = this.formDapodik.filter(s=>
                    s.pd_nama.toLowerCase() === data.pd_nama.toLowerCase() &&
                    s.pd_namaibu.toLowerCase().split(' ').includes(data.pd_namaibu.toLowerCase().split(' ')[0]) &&
                    s.nisn !== data.nisn
            )
            /**
             *  nama dan nisn potensi sama, ibu beda
             */
            const findLevelTujuh = this.formDapodik.filter(s=>
                    s.pd_nama.toLowerCase() === data.pd_nama.toLowerCase() &&
                    s.pd_namaibu.toLowerCase() !== data.pd_namaibu.toLowerCase() &&
                    s.nisn === data.nisn
            )
            /**
             * nama dan nisn potensi sama, ibu beda
             */
            const findLevelDelapan = this.formDapodik.filter(s=>
                    s.pd_nama.toLowerCase().split(' ').includes(data.pd_nama.toLowerCase().split(' ')[1]) &&
                    s.pd_namaibu.toLowerCase() !== data.pd_namaibu.toLowerCase() &&
                    s.nisn === data.nisn
            )
            /**
             * ibu dan nisn sama, nama beda
             */
            const findLevelSembilan = this.formDapodik.filter(s=>
                    s.pd_nama.toLowerCase() !== data.pd_nama.toLowerCase() && 
                    s.pd_namaibu.toLowerCase() === data.pd_namaibu.toLowerCase() &&
                    s.nisn === data.nisn
            )
            /**
             * ibu dan nisn sama, nama beda
             */
            const findLevelSepuluh = this.formDapodik.filter(s=>
                    s.pd_nama.toLowerCase() !== data.pd_nama.toLowerCase() && 
                    s.pd_namaibu.toLowerCase().split(' ').includes(data.pd_namaibu.toLowerCase().split(' ')[0]) &&
                    s.nisn === data.nisn
            )
            /** hnya nama yang sama */
            const findLevelSebelas = this.formDapodik.filter(s=>
                    s.pd_nama.toLowerCase() === data.pd_nama.toLowerCase() &&
                    s.pd_namaibu.toLowerCase() !== data.pd_namaibu.toLowerCase() &&
                    s.nisn !== data.nisn
            )
            /** hanya nama berpotensi sama */
            const findLevelDuabelas = this.formDapodik.filter(s=>
                    s.pd_nama.toLowerCase().split(' ').includes(data.pd_nama.toLowerCase().split(' ')[1]) &&
                    s.pd_namaibu.toLowerCase() !== data.pd_namaibu.toLowerCase() &&
                    s.nisn !== data.nisn
            )
            /** hanya nisn berpotensi sama */            
            const findLevelTigabelas = this.formDapodik.filter(s=>
                    s.pd_nama.toLowerCase() !== data.pd_nama.toLowerCase() &&
                    s.pd_namaibu.toLowerCase() !== data.pd_namaibu.toLowerCase() &&
                    s.nisn === data.nisn
            )

            if(findLevelSatu){
                level='satu';
                description="Valid";
                dataCompareState= [findLevelSatu];
            }else{
                if(findLevelDua.length === 0){
                    if(findLevelTiga.length === 0){
                        if(findLevelEmpat.length==0){
                            if(findLevelLima.length===0){
                                if(findLevelEnam.length===0){
                                    if(findLevelTujuh.length==0){
                                        if(findLevelDelapan.length === 0){
                                            if(findLevelSembilan.length === 0){
                                                if(findLevelSepuluh.length === 0){
                                                    if(findLevelSebelas.length===0){
                                                        if(findLevelDuabelas.length===0){
                                                            if(findLevelTigabelas.length>0){
                                                                level='tigabelas'
                                                                description="Perlu Validasi";
                                                                dataCompareState= findLevelTigabelas;
                                                            }
                                                        }else{
                                                            level='duabelas';
                                                            description="Perlu Validasi";
                                                            dataCompareState= findLevelDuabelas;
                                                        }
                                                    }else{
                                                        level='sebelas';
                                                        description="Perlu Validasi";
                                                        dataCompareState= findLevelSebelas;
                                                    }
                                                }else{
                                                    level='sepuluh';
                                                    description="Perlu Validasi";
                                                    dataCompareState= findLevelSepuluh;
                                                }
                                            }else{
                                                level='sembilan';
                                                description="Perlu Validasi";
                                                dataCompareState= findLevelSembilan;
                                            }
                                        }else{
                                            level='delapan';
                                            description="Perlu Validasi";
                                            dataCompareState= findLevelDelapan;
                                        }
                                    }else{
                                        level='tujuh';
                                        description="Perlu Validasi";
                                        dataCompareState= findLevelTujuh;
                                    }
                                }else{
                                    level='enam';
                                    description="Perlu Validasi";
                                    dataCompareState= findLevelEnam;

                                }
                            }else{
                                level='lima';
                                description="Perlu Validasi";
                                dataCompareState= findLevelLima;
                            }
                        }else{
                            level='empat';
                            description="Perlu Validasi";
                            dataCompareState= findLevelEmpat;
                        }
                    
                    }else{
                        level='tiga';
                        description="Perlu Validasi";
                        dataCompareState= findLevelTiga;
                    }

                }else{
                    level='dua';
                    description="NISN valid";
                    dataCompareState= findLevelDua;
                }
            }

            return {
                data: data, 
                validation: validation,
                level: level,
                dataCompare: dataCompareState,
                description: description,
                countDapodik: this.formDapodik.length

            }
        })
    }
}