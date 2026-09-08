import type { KoleksiMapelPaketSoal } from "~/domain/paket-soal/entities/koleksi-mapel-paket-soal";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";

export class SoalItemHasPaket{
    constructor(private readonly itemSoal: BankSoalAppType, private readonly koleksiPaketSoal:KoleksiMapelPaketSoal[] ){}
    build(){
        
    }
}