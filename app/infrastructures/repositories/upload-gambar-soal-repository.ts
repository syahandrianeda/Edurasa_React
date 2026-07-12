import AppScriptSheet from "~/configs/appscript-sheet";
import type { ParamFile } from "~/configs/appscript-config";

export default class UploadGambarSoalRepository extends AppScriptSheet {
  constructor() {
    super();
  }

  async uploadFileRepo(param: ParamFile): Promise<any> {
    return await this.uploadFile(param);
  }
}
