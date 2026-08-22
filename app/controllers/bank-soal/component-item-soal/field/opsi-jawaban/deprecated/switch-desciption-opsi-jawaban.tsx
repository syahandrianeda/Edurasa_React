import type { ReactNode } from "node_modules/@types/react";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";

export default function SwitchDescriptionOpsiJawaban({fokusBentukSoal, children}:{fokusBentukSoal:ListBentukSoalType, children:ReactNode}){

    return (
        <div className="border bg-white p-1 rounded text-xs flex flex-col md:flex-row gap-2 justify-between">
            <div>
                <p>
                    Bentuk Soal : {fokusBentukSoal?.description}
                </p>
                <p>Cara Koreksi : {fokusBentukSoal?.way_correction}</p>
            </div>
            <div>
                {
                    children
                }
            </div>
        </div>
    )
}