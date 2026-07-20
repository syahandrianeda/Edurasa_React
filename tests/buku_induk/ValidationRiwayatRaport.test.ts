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
        expect(dataValid).toHaveLength(3)
        expect(pesan1).toEqual('Kelas Awal belum diisi')
        expect(pesan2).toEqual('Awal kelas tidak sama dengan format NIS')
        expect(pesan3).toEqual('Masuk Tanggal Belum diisi')
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
        
        expect(dataValid).toHaveLength(2)
        expect(pesan1).toEqual('Awal kelas tidak sama dengan format NIS')
        expect(pesan2).toEqual('Masuk Tanggal Belum diisi')
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
        
        expect(dataValid).toHaveLength(2)
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
        
        expect(dataValid).toHaveLength(2)
        expect(pesan1).toEqual('Kelas Awal belum diisi')
        expect(pesan2).toEqual('Masuk Tanggal Belum diisi')
        
    })
})