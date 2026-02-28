import type { RefObject } from "react";


type Orientation = "portrait" | "landscape";

interface WordExportOptions {
  filename: string;
  orientation?: Orientation;
}

export const useAdvancedWordExport = () => {
  const exportToWord = async (
    elementRef: RefObject<HTMLElement>,
    options: WordExportOptions
  ): Promise<void> => {
    const { filename, orientation = "portrait" } = options;

    if (!elementRef.current) return;

    const clone = elementRef.current.cloneNode(true) as HTMLElement;

    await inlineAllStyles(clone);
    await convertImagesToBase64(clone);
    convertFlexAndGridToTable(clone);

    const sectionClass =
      orientation === "landscape" ? "Section2" : "Section1";

    const html = buildWordHtml(clone.innerHTML, sectionClass);

    downloadWordFile(html, filename);
  };

  return { exportToWord };
};

const inlineAllStyles = async (root: HTMLElement): Promise<void> => {
  const elements = root.querySelectorAll<HTMLElement>("*");

  elements.forEach((el) => {
    const computed = window.getComputedStyle(el);

    let styleString = "";

    for (let i = 0; i < computed.length; i++) {
      const prop = computed[i];
      const value = computed.getPropertyValue(prop);

      styleString += `${prop}:${value};`;
    }

    el.setAttribute("style", styleString);
  });
};

const convertImagesToBase64 = async (
  root: HTMLElement
): Promise<void> => {
  const images = root.querySelectorAll<HTMLImageElement>("img");

  const promises = Array.from(images).map(async (img) => {
    try {
      const dataUrl = await imageToBase64(img);
      img.src = dataUrl;
    } catch {
      console.warn("Failed converting image:", img.src);
    }
  });

  await Promise.all(promises);
};

const imageToBase64 = (img: HTMLImageElement): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return reject("No canvas context");
    let lebargambar = img.hasAttribute('style')?parseInt(img.style.width):parseInt(getComputedStyle(img).width);//img.width;
        let w = Math.min(lebargambar, 624);
        let h = Math.min(img.hasAttribute('style')?parseInt(img.style.height):img.height,img.height);

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      canvas.width = w;//|image.width;
      canvas.height = h;//||image.height;
      ctx.drawImage(image, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };

    image.onerror = reject;
    image.src = img.src;
  });
};

const convertFlexAndGridToTable = (root: HTMLElement): void => {
  const elements = root.querySelectorAll<HTMLElement>("*");

  elements.forEach((el) => {
    const style = window.getComputedStyle(el);

    if (style.display === "flex" || style.display === "grid") {
      const children = Array.from(el.children);

      if (children.length === 0) return;

      const table = document.createElement("table");
      table.style.width = "100%";
      table.style.borderCollapse = "collapse";

      const tr = document.createElement("tr");

      children.forEach((child) => {
        const td = document.createElement("td");
        td.style.verticalAlign = "top";
        // td.style.border='.5pt solid black';
        td.innerHTML = (child as HTMLElement).innerHTML;
        tr.appendChild(td);
      });

      table.appendChild(tr);
      el.innerHTML = "";
      el.appendChild(table);
    }
    // el.style.backgroundColor = style.backgroundColor
    // el.style.border = style.border
    el.setAttribute('style',`background-color:${style.backgroundColor};border:${style.border}`)

  });
};

const buildWordHtml = (
  bodyContent: string,
  sectionClass: string
): string => {
    let styles:string = "";
        let linklink = "";
        const allCss =  document.styleSheets;
        console.log('allCss', allCss)
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
  const stylesFinal = `
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
    ${styles}
  `;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <style>${stylesFinal}</style>
      </head>
      <body>
        <div class="${sectionClass}">
          ${bodyContent}
        </div>
      </body>
    </html>
  `;
};

const downloadWordFile = (
  html: string,
  filename: string
): void => {
  const blob = new Blob(["\ufeff", html], {
    type: "application/msword;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${filename}.doc`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};
