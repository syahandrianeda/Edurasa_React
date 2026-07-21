import { describe, expect, it } from "vitest";
import { ValidationPreRequesiteRiwayatRaport } from "~/domain/buku_induk/infrastructure/riwayat-raport/validation-riwayat-raport";
import type { SiswaType } from "~/types/siswa";
describe("ValidationPrerquesiteRiwayatRaport",()=>{

    it("Data siswa lolos untuk dibuatkan riwayat", ()=>{
        const data = {
            nis: '222301008',
            awal_kelas:'1A',
            masuk_tgl: new Date(2022,6,7),
            aktif:'aktif'


        } as SiswaType;
        const inst = new ValidationPreRequesiteRiwayatRaport(data);
        inst.evaluate();
        const dataValid = inst.dataValidation;
        expect(dataValid).toHaveLength(0)
    })
    it('tidak lolos karena tidak mengisi awal_kelas dan masuk_tgl', ()=>{
        const data = {
            nis: '222301008',
            awal_kelas:'',
            // masuk_tgl: new Date(2022,6,7),


        } as SiswaType;
        const inst = new ValidationPreRequesiteRiwayatRaport(data);
        inst.evaluate();
        const dataValid = inst.dataValidation;
        const pesan1 = dataValid[0].message
        const pesan2 = dataValid[1].message
        const pesan3 = dataValid[2].message
        const pesan4 = dataValid[3].message
        const pesan5 = dataValid[4].message
        expect(dataValid).toHaveLength(5)
        expect(pesan1).toEqual('Kelas Awal belum diisi')
        expect(pesan2).toEqual('Awal kelas tidak sama dengan format NIS')
        expect(pesan3).toEqual('Masuk Tanggal Belum diisi')
        expect(pesan4).toEqual('Siswa selain aktif, harus tahu kapan dia keluar')
        expect(pesan5).toEqual('Status siswa selain aktif dan lulus, harus punya data kelas terakhir saat tidak aktif(pindah, non-aktif, dll)')
    })
    it('tidak lolos karena salah Format NIS, awal_kelas, masuk_tgl undefined', ()=>{
        const data = {
            nis: '222301008',
            awal_kelas:'2A',
            // masuk_tgl: new Date(2022,6,7),


        } as SiswaType;
        const inst = new ValidationPreRequesiteRiwayatRaport(data);
        inst.evaluate();
        const dataValid = inst.dataValidation;
        const pesan1 = dataValid[0].message
        const pesan2 = dataValid[1].message
        const pesan3 = dataValid[2].message
        const pesan4 = dataValid[3].message

        expect(dataValid).toHaveLength(4)
        expect(pesan1).toEqual('Awal kelas tidak sama dengan format NIS')
        expect(pesan2).toEqual('Masuk Tanggal Belum diisi')
        expect(pesan3).toEqual('Siswa selain aktif, harus tahu kapan dia keluar')
        expect(pesan4).toEqual('Status siswa selain aktif dan lulus, harus punya data kelas terakhir saat tidak aktif(pindah, non-aktif, dll)')
    
    })
    it("masuk tanggal invalid, nisFormat jenjang !== awal kelas",()=>{
        const data = {
            nis: '222302008',
            awal_kelas:'1A',
            // masuk_tgl: new Date(2022,6,7),


        } as SiswaType;
        const inst = new ValidationPreRequesiteRiwayatRaport(data);
        inst.evaluate()
        const dataValid = inst.dataValidation;
        const pesan1 = dataValid[0].message
        const pesan2 = dataValid[1].message
        
        expect(dataValid).toHaveLength(4)
        expect(pesan1).toEqual('Awal kelas tidak sama dengan format NIS')
        expect(pesan2).toEqual('Masuk Tanggal Belum diisi')
        
    })
    it("nis Kosong",()=>{
        const data = {
            nis: '',
            awal_kelas:'',
            // masuk_tgl: new Date(2022,6,7),


        } as SiswaType;
        const inst = new ValidationPreRequesiteRiwayatRaport(data);
        inst.evaluate()
        const dataValid = inst.dataValidation;
        const pesan1 = dataValid[0].message
        const pesan2 = dataValid[1].message
        
        expect(dataValid).toHaveLength(4)
        expect(pesan1).toEqual('Kelas Awal belum diisi')
        expect(pesan2).toEqual('Masuk Tanggal Belum diisi')
        
    })
    it("siswa selain status aktif, harus ada keluar tanggalnya, dan tidak valid jika kosong",()=>{
        const data = {
            nis: '222301008',
            awal_kelas:'1A',
            masuk_tgl: new Date(2022,6,7),
            aktif:'pindah'

            // masuk_tgl: new Date(2022,6,7),


        } as SiswaType;
        const inst = new ValidationPreRequesiteRiwayatRaport(data);
        inst.evaluate()
        const dataValid = inst.dataValidation;
        // const pesan1 = dataValid[0].message
        
        expect(dataValid).toHaveLength(2)
        
    })
    it("siswa selain status aktif, harus ada keluar tanggalnya, valid karena ada",()=>{
        const data = {
            nis: '222301008',
            awal_kelas:'1A',
            masuk_tgl: new Date(2022,6,7),
            aktif:'pindah',
            keluar_tgl:new Date(2023,5,1),
            kelas_keluar:'2A'
        } as SiswaType;
        const inst = new ValidationPreRequesiteRiwayatRaport(data);
        inst.evaluate()
        const dataValid = inst.dataValidation;
        // const pesan1 = dataValid[0].message
        
        expect(dataValid).toHaveLength(0)
        
    })
    
    it("siswa selain status aktif, harus ada keluar tanggalnya dan kelas_keluar, valid karena ada",()=>{
        const data = {
            nis: '222301008',
            awal_kelas:'1A',
            masuk_tgl: new Date(2022,6,7),
            aktif:'pindah',
            keluar_tgl:new Date(2023,5,1),

        } as SiswaType;
        const inst = new ValidationPreRequesiteRiwayatRaport(data);
        inst.evaluate()
        const dataValid = inst.dataValidation;
        // const pesan1 = dataValid[0].message
        
        expect(dataValid).toHaveLength(1)
        
    })
    it("siswa lulus, harus ada tanggal kelulusan (keluar_tgl)",()=>{
        const data = {
            nis: '222301008',
            awal_kelas:'1A',
            masuk_tgl: new Date(2022,6,7),
            aktif:'lulus',
            keluar_tgl:new Date(2023,5,1)
        } as SiswaType;
        const inst = new ValidationPreRequesiteRiwayatRaport(data);
        inst.evaluate()
        const dataValid = inst.dataValidation;
        // const pesan1 = dataValid[0].message
        
        expect(dataValid).toHaveLength(0)
        
    })
    it("siswa lulus, masih punya kelas_keluar, ketika keluar_tgl diisi",()=>{
        const data = {
            nis: '222301008',
            awal_kelas:'1A',
            masuk_tgl: new Date(2022,6,7),
            aktif:'lulus',
            keluar_tgl:new Date(2023,5,1)
        } as SiswaType;
        const inst = new ValidationPreRequesiteRiwayatRaport(data);
        inst.evaluate()
        const dataValid = inst.dataValidation;
        const kelasTerakhir = inst.lastJenjang()
        // const pesan1 = dataValid[0].message
        
        expect(dataValid).toHaveLength(0)
        expect(kelasTerakhir).toEqual(6)
        
    })
})