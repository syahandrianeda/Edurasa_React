import ImgDriveComp from "~/components/image-from-drive/img-drive"
import NoImage from '../../../images/noImage.png';

export function ImageProfileOrAbsen({idProfil}:{idProfil:string}){

    if(idProfil === '' ){
        return (
            <img src={NoImage} className="h-30 w-30 mx-auto border-2 rounded-full" referrerPolicy="no-referrer" />
        )
    }
    return (
        <ImgDriveComp className="h-30 w-30 mx-auto border-2 bg-sky-300 rounded-xl" src={idProfil}/>
    )
}