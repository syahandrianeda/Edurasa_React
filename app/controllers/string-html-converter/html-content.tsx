import { useMemo } from "react";
import { useFilePreview } from "~/components/form-custom/files-input";
import { prepareHtmlImages } from "./prepareHtmlImages";
import { cn } from "~/lib/utils";

interface Props {
    html: string;
    className: string;
}

export function HtmlContent({ html, className }: Props) {
    const { open } = useFilePreview();

    const preparedHtml = useMemo(
        () => prepareHtmlImages(html),
        [html]
    );

    return (
        <div
            className={cn("editor-document", className)}
            onClick={(event) => {
                const target = event.target;

                if (!(target instanceof Element)) return;

                const img = target.closest<HTMLImageElement>(
                    "img[data-file-preview='true']"
                    // "img"
                );
                
                if (!img) return;

                const src = img.getAttribute("src")?.trim();
                
                if (!src) return;

                event.preventDefault();
                const srcSerialize = src.replace('https://lh3.googleusercontent.com/d/','')
                open(srcSerialize);
            }}
            dangerouslySetInnerHTML={{
                __html: preparedHtml,
            }}
        />
    );
}
