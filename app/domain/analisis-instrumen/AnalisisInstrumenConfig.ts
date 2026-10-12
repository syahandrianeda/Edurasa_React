export interface AnalisisInstrumenConfig {
    batasKesukaranSulit: number;
    batasKesukaranMudah: number;

    batasKorelasiSangatRendah: number;
    batasKorelasiRendah: number;
    batasKorelasiCukup: number;

    minimumPeserta: number;
}

export const defaultAnalisisInstrumenConfig: AnalisisInstrumenConfig = {
    batasKesukaranSulit: 0.30,
    batasKesukaranMudah: 0.70,

    batasKorelasiSangatRendah: 0.20,
    batasKorelasiRendah: 0.30,
    batasKorelasiCukup: 0.40,

    minimumPeserta: 10,
};