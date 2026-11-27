import { cn } from "~/lib/utils"
import urlTtddKepsek from '~/images/ttd/Nenah.png';

type Props={
    className:string
}
export default function ImgTtdKepsek({className}:Props){
    return <img src={urlTtddKepsek} className={cn("aspect-auto", className)} alt="ttd kepala sekolah"/>
}