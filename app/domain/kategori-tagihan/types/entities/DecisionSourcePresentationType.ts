export type DecisionSourceRekapSkorKdPresentation = 
    /** 
     * sumber utama  **respon** adalah sheet nilai, tab **tagihan_respon_<jenjang>**
     * */
    | 'respon'
    /**
     * sumber utama **respon** adalah sheet nilai tab `harian`, `mid_semester`, `akhir_tahun`, `ujuan_smester`, dll;
     */
    | 'sheet'
    /** sumber utama **decision** adalah **sheet**. Jika tidak ada sheet, maka diambil dari data tab **respon**. */
    | 'decision'
    /**
     * `none` berarti data dari tab **tagihan_respon_<jenjang>** maupun tab sheet TIDAK ADA
     */
    | 'none';