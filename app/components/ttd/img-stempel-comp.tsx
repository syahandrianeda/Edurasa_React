import { cn } from "~/lib/utils"
import urlStempel from "~/images/ttd/stempel_logo.png";

type Props= {
    className:string
}
export default function ImgStempelCom({className}:Props){
    return <img src={urlStempel} className={cn('aspect-square', className)} alt="stempel"/>
}