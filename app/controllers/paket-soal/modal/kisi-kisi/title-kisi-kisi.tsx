export default function TitleKisiKisi({PaketSoalName}:{PaketSoalName:string}){
    return (
        <>
            <h2 className="text-2xl text-center font-extrabold uppercase">Kisi kisi Soal</h2>
            <h3 className="text-xl text-center font-bold uppercase">(Assesment blueprint)</h3>
            <h4 className="text-lg text-center font-bold uppercase">{PaketSoalName}</h4>
        </>
    )
}