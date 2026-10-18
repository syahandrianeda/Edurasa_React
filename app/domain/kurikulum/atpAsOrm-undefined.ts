import type { AtpAsOrm } from "~/types/kurikulum/prota-orm";

export default class AtpAsOrmUndefined{
    static build():AtpAsOrm{
        const stringBlangko:string = 'Tidak dikenal, periksa kurikulum/sumber refrensinya'
        return {
             idbaris_server         : 0,
            atp_as_tp_description   : stringBlangko,
            atp_as_tp_id            : 0,
            tp_as_cp_description    : stringBlangko,
            tp_as_cp_id             : 0,
            cp_description          : stringBlangko,
            cp_id                   : 0,
            elemen                  : stringBlangko,
            lingkup_materi          : stringBlangko,
            kelas                   : [],
            kodemapel               : stringBlangko,
            mapelname               : stringBlangko,
            fase                    : stringBlangko,
            invalid                 : true,
            message                 : [stringBlangko, 'jika ini dari paket soal, periksa apakah soal tersedia']
        }
    }
}