import { describe, expect, it } from "vitest";
import { store } from "~/context-reduct/redux-provider";
import type { DataSheetNeeeded } from "~/domain/enloaded/data-sheet-needed-type";
import BuildParamLoaded from "~/infrastructures/ensure-loaded-api/build-param-loaded";
import sampleState from "../fixtures/sampel-state-redux.json"
import type { RootState } from "~/context-reduct/store";

describe('BuildParamEnloaded', ()=>{
    const state = sampleState as unknown as RootState;
    const sheetNeeded:DataSheetNeeeded[] = [
        {sheet:'akun', tab:'dataSiswa'},
        {sheet:'absensi', tab:'kelas_3A'},
        {sheet:'absensi', tab:'kelas_4A'},
        {sheet:'tabungan', tab:'tabungan_1A'},
        {sheet:'tabungan', tab:'tabungan_2A'},
    ]
    const sheetNeededTrial:DataSheetNeeeded[] = [
        {sheet:'akun',      tab:'trial_dataSiswa'},
        {sheet:'absensi',   tab:'trial_kelas_3A'},
        {sheet:'absensi',   tab:'trial_kelas_4A'},
        {sheet:'tabungan',  tab:'trial_tabungan_1A'},
        {sheet:'tabungan',  tab:'trial_tabungan_2A'},
    ]

    it("terdeteksi method state", ()=>{
        const instance = new BuildParamLoaded(state, sheetNeeded);
        expect(instance.state).toHaveProperty('auth')
        expect(instance.state).toHaveProperty('dataSiswa')
    })

    it("memisahkan sheetNeeded yang memiliki hasCollection dan tidak",()=>{
        const instance = new BuildParamLoaded(state, sheetNeeded);
        const {sheetNeedHasCollection, sheetNeedCheckStateImmadiately} = instance.filteringSheetNeedHasCollection();
        expect(instance.state).toHaveProperty('auth')
        expect(instance.state).toHaveProperty('dataSiswa')
        expect(sheetNeedCheckStateImmadiately).toMatchObject([{
            sheet:'akun',      tab:'dataSiswa'
        }])
        expect(sheetNeedHasCollection).toMatchObject([
            {sheet:'absensi',   tab:'kelas_3A'},
            {sheet:'absensi',   tab:'kelas_4A'},
            {sheet:'tabungan',  tab:'tabungan_1A'},
            {sheet:'tabungan',  tab:'tabungan_2A'},
        ])
    })

    it("test state json",()=>{
        expect(state).toHaveProperty('absensiSiswa.dataAbsensi.length', 2)
    })

    it('stateJson akun and dataSiswa has loaded', ()=>{
        expect(state.auth.loaded).toBe(true)
        expect(state.dataSiswa.loaded).toBe(true)
        expect(state.tabungan).toBeUndefined()
    })

    it('check sheetNeed yang harus dipanggil',()=>{
        const instance = new BuildParamLoaded(state, sheetNeeded).evaluate();
        const param = instance.param
        const sheetNeededMustCall = instance.sheetToBeParam
        expect(param).toHaveLength(4)
        expect(sheetNeeded).toHaveLength(4)
    })


})