import ImgNotFound from '../images/noImage.png'

export default function urlImgDrive(id:string){
    if(!id){
        return ImgNotFound
    }
    return `https://lh3.googleusercontent.com/d/${id}`;
}