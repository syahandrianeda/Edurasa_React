import ImgDriveComp from "~/components/image-from-drive/img-drive"
import NoImage from '../../../images/noImage.png';
import { cn } from "~/lib/utils";

export function ImageProfileOrAbsen({idProfil, className}:{idProfil:string, className?:string}){
    
    if(idProfil === '' ){
        return (
            <img src={NoImage} className={cn("h-30 w-30 mx-auto border-2 rounded-full",className)} referrerPolicy="no-referrer" />
        )
    }
    return (
        <ImgDriveComp className={cn("h-30 w-30 mx-auto border-2 bg-sky-300 rounded-xl",className)} src={idProfil}/>
    )
}