import fs from 'node:fs';

const file = 'app/domain/kategori-tagihan/services/KategoriAssesmenClass.ts';

const newImports = `import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import KategoriAsessmenInPublikasiBuilder from "../builder/KategoriAsessmenInPublikasiBuilder";
import KoleksiKategoriAssesmenOnJenjang from "../builder/KoleksiKategoriAssesmenOnJenjang";
import type { DataSiswaHasMapelType } from "~/domain/penilaian/infrastucture/dataSiswaHasMapel";
import type { KategoriTagihanHasManyPesertaMapelType } from "../types/kategori-tagihan-hasMany-respon-siswa/KategoriTagihanHasManyPesertaMapelType";
import type { KategoriTagihanType } from "../types/entities/KategoriTagihanType";
import getOrCreateMap from "~/lib/getOrCreateMapper";
import MapperTagihanHasDataRespon from "~/domain/penilaian/infrastucture/MapperTagihanHasDataRespon";
import KategoriTagihanRaportBuilder from "../builder/KategoriTagihanRaportBuilder";
import KategoriTagihanHasManyPesertaMapelBuillder from "../builder/KategoriTagihanHasManyPesertaMapelBuillder";
import type { jp_mapelApp } from "~/types/mapel/jp_mapel";
import { kategoriTagihanHasManyPesertaMapelBuilder, konteksKategoriAsesmenBuilder } from "./konteks-kategori-asesmen-builder";
import { koleksiMapelBasedSiswaBuilder } from "./data-nilai-builder";`;

const newInit = `    init():this{
        const koleksiKategoriAssesmen = KoleksiKategoriAssesmenOnJenjang.build();
        const mapperKategoriAssesmen = KategoriAsessmenInPublikasiBuilder.buildMapper(this.data);
        const result:KategoriTagihanHasManyPesertaMapelType[] = [];

        for(const type of koleksiKategoriAssesmen){
            const koleksiJenisTagihanHasRespon = mapperKategoriAssesmen.get(type);

            if(!koleksiJenisTagihanHasRespon) {
                /** jika tidak ditemukan koleksii jenis tagihan, tetap buatkan data type-nya.
                 * properti lain akan default;
                 */
                result.push(kategoriTagihanHasManyPesertaMapelBuilder(type));
                continue;
            }

            /** mapper/struktur/koleksi yang dibutuhkan pada satu kategori assesmen */
            const konteks = konteksKategoriAsesmenBuilder(koleksiJenisTagihanHasRespon);

            /** ========= BUILD DATA ======== */
            const {data, koleksiAtpInMapel} = koleksiMapelBasedSiswaBuilder(this.mapelRaport, konteks);

            const objKategoriTagihanHasManyPesertaMapelType = kategoriTagihanHasManyPesertaMapelBuilder(type);
            objKategoriTagihanHasManyPesertaMapelType.data = data;
            objKategoriTagihanHasManyPesertaMapelType.koleksiPaketSoal = konteks.koleksiPaketSoal;
            objKategoriTagihanHasManyPesertaMapelType.koleksiAtpInMapel = koleksiAtpInMapel;
            result.push(objKategoriTagihanHasManyPesertaMapelType);
        }
        this._resultData =result;
        return this;
    }`;

const docOld = 'Method `init()` asli dibiarkan tidak diubah.';
const docNew = [
    'Catatan: badan `init()` kini mendelegasikan pekerjaannya ke helper pada file terpisah;',
    '* signature, result type, dan nilai hasil `init()` tetap sama seperti sebelum refactor.'
].join('\n');

let src = fs.readFileSync(file, 'utf8');
const usesCrlf = src.includes('\r\n');
const nl = usesCrlf ? '\r\n' : '\n';
const lines = src.split(nl);

// 1. ganti seluruh blok import (baris pertama sampai baris non-import pertama)
let importEnd = 0;
while (importEnd < lines.length && lines[importEnd].startsWith('import ')) importEnd++;
if (importEnd === 0) throw new Error('blok import tidak ditemukan');
lines.splice(0, importEnd, ...newImports.split('\n'));

// 2. perbarui kalimat dokumentasi yang menyatakan init tidak diubah
const docIdx = lines.findIndex(l => l.includes(docOld));
if (docIdx === -1) throw new Error('kalimat dokumentasi tidak ditemukan');
const docIndent = lines[docIdx].slice(0, lines[docIdx].indexOf('*'));
lines.splice(docIdx, 1, ...docNew.split('\n').map((l, i) => (i === 0 ? docIndent + '* ' + l : docIndent + l)));

// 3. ganti badan method init(): dari "    init():this{" sampai "    }" sebelum penutup class "}"
const start = lines.findIndex(l => l === '    init():this{');
if (start === -1) throw new Error('deklarasi init() tidak ditemukan');
let end = -1;
for (let j = start + 1; j < lines.length; j++) {
    if (lines[j] === '    }' && lines[j + 1] === '}') { end = j; break; }
}
if (end === -1) throw new Error('akhir method init() tidak ditemukan');
lines.splice(start, end - start + 1, ...newInit.split('\n'));

fs.writeFileSync(file, lines.join(nl));
console.log('OK: importEnd=' + importEnd + ', docIdx=' + docIdx + ', init=' + start + '-' + end + ', totalLines=' + lines.length);
