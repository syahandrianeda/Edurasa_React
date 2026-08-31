export default function KunciJawabanPreview ({data}:{data:string[]}){
    return data.map((m, i)=><p key={i}>{m}</p>)
}