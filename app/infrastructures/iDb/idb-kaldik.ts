
import type { KaldikSheetType } from "~/types/kaldik";
import { IndexedDBRepository } from "./indexDb-repository";


export class IndDbKaldikRepository
  extends IndexedDBRepository<KaldikSheetType>
{
  constructor() {
    super("trial_kalender");
  }
}