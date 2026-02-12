export type TypeComponent = 'h1'|'h2'|'h3'|'h4'|'p';

export interface TextJudul{
    text: string,
    type: TypeComponent
    className?:string
}

export interface TextDeskripsi{
    text:string,
    type:'bottom'|'top'
    className?:string
}

export interface InputTypeEditor{
    type: TypeComponent,
    text: string,
    label?:string,
    id?:string,
    classNames: string[]
}
export const DefaultClassByType: Record<TypeComponent, string[]> = {
    h1: ['text-4xl', 'font-bold'],
    h2: ['text-3xl', 'font-bold'],
    h3: ['text-2xl', 'font-bold'],
    h4: ['text-xl', 'font-bold'],
    p: ['leading-relaxed']
}
