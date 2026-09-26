import { Link, useLocation } from "react-router"
import { cn, isSameUrl } from "~/lib/utils"
import type { typeKoleksiMenu } from "~/types"

export default function IconMenu({menus, className}:{menus:typeKoleksiMenu[], className?:string}){
    const url = useLocation();
    return (
        <nav className={cn("grid grid-cols-4 md:grid-cols-7 gap-4 md:gap-8 place-items-center justify-between mx-auto", className)}>
            {menus.map((item,index)=>{
                if(item.showInRoute){
                    if(isSameUrl(url.pathname,'/menu-siswa')){
                        return null
                    }
                }
                return(
                    <div key={index} className={cn("relative flex justify-center items-center overflow-hidden group ", item.classNameIcon)}>
                        <Link to={`/${item.routeName}`} role="button">
                            <img src={item.urlIcon as string} className="rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-sky-500 to-90% bg-cover  size-20 overflow-visible group-hover:scale-105 grayscale-75 group-hover:grayscale-0 transition-all duration-100 ease-linear"/>
                            <div className={`rounded-full ${item.hasRoute?'bg-green-500':'bg-gray-500'} h-3 w-3 text-center text-small absolute top-0 right-0`}></div>
                            {item.title.split(' ')[1] && (
                                <div className="absolute bg-linear-65 from-[#E45A92] to-purple-500 text-small text-white p-0 mb-2 leading-3 rotate-x-15 -rotate-y-30 text-center bottom-0 left-0 md:left-0 text-[12px] translate-y-1 rounded-4xl w-full  md:group-hover:-left-30 transition-all duration-500 ease-linear">{item.title.split(' ')[1]}</div>
                            )}
                            <div className="absolute bg-linear-65 from-[#9112BC] via-[#E45A92] to-[#FFACAC] text-small text-white p-1 leading-2 rotate-x-15 -rotate-y-30 text-start bottom-0 left-0  -translate-y-4 translate-x-0 md:translate-x-0 md:group-hover:translate-x-50 transition-all duration-500 ease-linear rounded-4xl">{item.title.split(' ')[0]}</div>
                        </Link>
                    </div>
                )
            })}
        </nav>
    )
}