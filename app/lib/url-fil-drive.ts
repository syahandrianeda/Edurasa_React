/**
 * window.open('https://drive.google.com/file/d/1I5r2u_cO1WrqLMNxfTIhSnn0Gmo5GAO4/view?usp=drivesdk','', 'width=720,height=600')
 */
import ImgNotFound from '../images/noImage.png'

export default function urlFileDrive(id:string){
    if(!id){
        return ImgNotFound
    }
    return `https://drive.google.com/file/d/${id}/view?usp=drivesdk`;
}