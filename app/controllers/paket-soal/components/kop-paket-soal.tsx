import logokota from '../../../images/kotadepok.webp'
import logoSekolah from '../../../images/ratujaya1.png';

export default function KopPaketSoal({data}:{data:string[]}){
    return (
        <table className='w-full mb-4' data-word="kop">
        <tbody>
            <tr>
                <td className="text-center align-top border-b-8 border-double pb-1 border-black">
                    <img src={logokota} className='h-31.25 w-auto mx-auto align-middle'/>
                </td>
                <td className="text-center align-top border-b-8 border-double pb-1 border-black">
                    <p className="text-center font-arial font-bold text-2xl mb-0 leading-none">{data[0]}</p>
                    <p className="text-center font-arial font-extrabold text-4xl mb-0 leading-none">{data[1]}</p>
                    <p className="text-center font-arial font-extrabold text-2xl mb-1 mt-0 leading-none">{data[2]}</p>
                    <p className="text-center font-arial text-xl mb-0 leading-none">{data[3]}</p>
                </td>
                <td className="text-center align-top border-b-8 border-double pb-1 border-black">
                    <img src={logoSekolah} className='h-31.25 w-auto mx-auto'/>
                </td>
            </tr>
        </tbody>
    </table>
    )
}