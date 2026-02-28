// import { RefObject } from "react";

import type { RefObject } from "react";

type Orientation = "portrait" | "landscape";

interface WordExportOptions {
  filename: string;
  orientation?: Orientation;
  maxWidth?: number;
}

const useWordExport = () => {
    const exportToWord = (
        elementRef: RefObject<HTMLElement>,
        options: WordExportOptions
    ): void => {
        const { filename, orientation = "portrait" } = options;

        if (!elementRef.current) {
            console.warn("Element reference is null.");
            return;
        }
        let styles:string = "";
        let linklink = "";
        const allCss =  document.styleSheets;
        for(let i = 0 ; i < allCss.length ; i++){
        
                let lnk = allCss[i].href;
                
                linklink+=`<link href="${lnk}" rel="stylesheet">`
                let styleR = null;
                
                if(lnk?.indexOf('cloudflare')==-1 && lnk.indexOf('fonts.googleapis.com')==-1){
                    
                    let d = allCss[i].cssRules;
                    let f = allCss[i].rules;
                    styleR = d||f;
                    let css = "";
                    for(let itm in styleR){
                        
                        if(styleR[itm].cssText != undefined)
                            css += (styleR[itm].cssText)+"\r\n";
                            
                            
                    }
                    
                    styles+=css;//`${css}table{border-collapse:collapse;border-spacing:0;}th,td{padding:4px 5px}body{font-family:'timesNewRoman'}ol{style="margin:0 0 0 -1.5em!important;padding-left:1.3em;"} ol li{padding-left:0.7em!important;mso-pdding-left:0.7cm;mso-margin-bottom:.8em}p{margin-bottom:0!important;line-height:normal}`;
                    // styles+=`${css}table{border-collapse:collapse;border-spacing:0;}th,td{padding:4px 5px}body{font-family:'timesNewRoman'}ol{style="margin:0 0 0 -1.5em!important;padding-left:1.3em;"} ol li{padding-left:0.7em!important;mso-pdding-left:0.7cm;mso-margin-bottom:.8em}p{margin-bottom:0!important;line-height:normal}`;

                }
            }

        // Clone safely
        const clone: HTMLElement = elementRef.current.cloneNode(
        true
        ) as HTMLElement;

        // Convert .row layout into table (Word safe)
        const rows: NodeListOf<HTMLElement> =
        clone.querySelectorAll<HTMLElement>(".flex");

        rows.forEach((row: HTMLElement) => {
        const children: HTMLCollection = row.children;

        if (!children || children.length === 0) return;

        const table: HTMLTableElement =
            document.createElement("table");
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";

        const tbody: HTMLTableSectionElement =
            document.createElement("tbody");
        const tr: HTMLTableRowElement =
            document.createElement("tr");

        Array.from(children).forEach((child: Element) => {
            const td: HTMLTableCellElement =
            document.createElement("td");

            td.style.verticalAlign = "top";
            td.style.padding = "6px";
            td.innerHTML = child.innerHTML;

            tr.appendChild(td);
        });

        tbody.appendChild(tr);
        table.appendChild(tbody);

        row.innerHTML = "";
        row.appendChild(table);
        });

        const stylesFinal: string = `
        @page Section1 {
            size: 595.45pt 841.7pt;
            margin: 1.27cm;
        }
        @page Section2 {
            size: 841.7pt 595.45pt;
            margin: 1.27cm;
            mso-page-orientation: landscape;
        }
        div.Section1 { page: Section1; }
        div.Section2 { page: Section2; }

        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #000; }
        body { font-family: "Times New Roman", serif; }
        ${styles}
        `;

        const sectionClass: string =
        orientation === "landscape"
            ? "Section2"
            : "Section1";

        const htmlContent: string = `
        <!DOCTYPE html>
        <html>
            <head>
            <meta charset="utf-8" />
            <style>${stylesFinal}</style>
            </head>
            <body>
            <div class="${sectionClass}">
                ${clone.innerHTML}
            </div>
            </body>
        </html>
        `;

        const blob: Blob = new Blob(
        ["\ufeff", htmlContent],
        { type: "application/msword;charset=utf-8;" }
        );

        const url: string = URL.createObjectURL(blob);

        const link: HTMLAnchorElement =
        document.createElement("a");

        link.href = url;
        link.download = `${filename}.doc`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    return { exportToWord };
};
