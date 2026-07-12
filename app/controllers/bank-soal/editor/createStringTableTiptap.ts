import { generateAlphabet } from "~/lib/generateAlphabet";

export function createStringTableTiptap(row:number, col:number){
    let result:string=`<table style="width:100%;"><tbody>`;
    for(let r:number = 0 ; r < row+1; r++){
        result+=`<tr>`;
        for(let c:number = 0 ; c < col; c++){
            //jika r === 0 itu header, maka:
            if(r === 0){
                result+=`<th>`;
                    if(c !== 0 ){
                        result+= `Heading ${c}`;
                    }
                result+=`</th>`;
            }else{
                result+=`<td>`;
                    if(c === 0){
                        let n:string='';
                        n = String.fromCharCode(65 + (r-1));
                        result+= n;
                        n='';
                    }
                result+=`</td>`;
            }
        }
        result+=`</tr>`;
    }
    result+=`</tbody></table>`;
    return result;
}
