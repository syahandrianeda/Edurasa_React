import type { StrukturAtpInterface, StrukturCpInterface, StrukturMapelInterface } from "~/domain/trees-struktur-kurikulum";
import getOrCreateMap from "~/lib/getOrCreateMapper";

export abstract class Composite< TMeta, TKey extends PropertyKey, TChild > {
    protected readonly children = new Map<TKey, TChild>();

    constructor( public readonly data: TMeta ) {}

    // Mengakses mapper tanpa memberikan akses mutasi langsung
    get mapper(): ReadonlyMap<TKey, TChild> {
        return this.children;
    }

    getById(id: TKey): TChild | undefined {
        return this.children.get(id);
    }

    getAll(): TChild[] {
        return [...this.children.values()];
    }

    protected getOrCreate( id: TKey, factory: () => TChild ): TChild {
        // return this.children.getOrInsertComputed(id, factory);
        return getOrCreateMap(this.children, id, factory)
    }
}

// class MapelComposite extends Composite< StrukturMapelInterface, string, CpComposite > {
//   addCp(data: StrukturCpInterface): CpComposite {
//     return this.getOrCreate(
//       data.cp_id,
//       () => new CpComposite(data)
//     );
//   }

//   getCp(id: number): CpComposite | undefined {
//     return this.getById(id);
//   }
// }


// export abstract class BaseDataComposite<T,TChild>{
//     abstract getData():T[]
//     abstract getMapper():Map<T, TChild>
// }
