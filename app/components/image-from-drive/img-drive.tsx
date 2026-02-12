import type { ComponentProps } from "react";
import urlImgDrive from "~/lib/url-img-drive";
import { cn } from "~/lib/utils";

export default function ImgDriveComp({src, className, ...props}:ComponentProps<'img'>){
    const url = src && urlImgDrive(src);
    if(!url) return null;
    return (
        <img src={url} {...props} className={cn("aspect-square", className)} referrerPolicy="no-referrer"/>
    )
}