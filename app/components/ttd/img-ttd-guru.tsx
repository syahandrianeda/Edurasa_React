import { cn } from "~/lib/utils";
import ImgDriveComp from "../image-from-drive/img-drive";

export default function ImgTtdGuru({idUrl, className}:{idUrl:string, className?:string}){

    return <ImgDriveComp src={idUrl} className={cn("aspect-auto", className)} alt="ttd kepala sekolah"/>
}