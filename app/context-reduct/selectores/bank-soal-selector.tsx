import DtoBankSoal from "~/dtos/dto-bank-soal";
import type { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { OrmPromesInstanceSelector } from "./orm-promes-selector";
import BankSoalAtpClass from "~/domain/bank-soal/orm/atp-bank-soal";
import AtpOrmHasManySoal from "~/domain/bank-soal/relational-soal/services/atp-has-many-soal";

export const PureBankSoalSelector = (s:RootState)=>s.bankSoal.data;
export const DtoBankSoalSelector = createSelector(
    [
        PureBankSoalSelector
    ],
    (data)=>DtoBankSoal.arrrayFromSheetToApp(data).sort((a, b)=>b.idbaris - a.idbaris));

export const KoleksiSoalInstanceSelector = createSelector([
    DtoBankSoalSelector,
    OrmPromesInstanceSelector
], (bankSoal, Atp)=>{
        if(!Atp) return;
    return new BankSoalAtpClass(bankSoal, Atp).generate().groupedBankSoalBasedMapel();//.query();
})

export const AtpHasManySoalSelector = createSelector(
    [
        OrmPromesInstanceSelector,
        DtoBankSoalSelector
    ], 
    (AtpAsOrmInstance, koleksiSoal)=>{
        if(!AtpAsOrmInstance) return;
        const AtpAsOrm = AtpAsOrmInstance.dataAllAtpValidInRombel;
        const atpWithSoal = new AtpOrmHasManySoal(AtpAsOrm, koleksiSoal).build().groupingBasedMapel();//.query();

        return atpWithSoal;//.dataGroup
    })