import Image from "@tiptap/extension-image";

function getDimensionFromStyle(style: string | null, property: "width" | "height") {
    if (!style) return undefined;
    const match = style.match(new RegExp(`${property}\\s*:\\s*([^;]+)`));
    return match?.[1]?.trim();
}

function buildImageStyle(style: string | null | undefined, width?: string, height?: string) {
    const declarations = (style || "")
        .split(";")
        .map((part) => part.trim())
        .filter(Boolean)
        .filter((part) => !part.toLowerCase().startsWith("display:") && !part.toLowerCase().startsWith("width:") && !part.toLowerCase().startsWith("height:"));

    declarations.push("display:inline-block");
    declarations.push("max-width:100%");
    declarations.push("vertical-align:middle");

    if (width && width !== "auto") declarations.push(`width:${width}`);
    if (height && height !== "auto") declarations.push(`height:${height}`);

    return Array.from(new Set(declarations)).join("; ");
}

function getResolvedImageSize(node: any) {
    const style = node?.attrs?.style || "";
    const width = getDimensionFromStyle(style, "width") || node?.attrs?.width || "auto";
    const height = getDimensionFromStyle(style, "height") || node?.attrs?.height || "auto";
    return { width, height };
}

export const ResizableImage = Image.extend({
    addAttributes() {
        return {
        ...this.parent?.(),
        width: {
            default: "auto",
            parseHTML: (element) => {
                const widthAttr = element.getAttribute("width");
                if (widthAttr && widthAttr !== "auto") return widthAttr;
                return getDimensionFromStyle(element.getAttribute("style"), "width") || "auto";
            },
            renderHTML: () => {
                return {};
            },
        },
        height: {
            default: "auto",
            parseHTML: (element) => {
                const heightAttr = element.getAttribute("height");
                if (heightAttr && heightAttr !== "auto") return heightAttr;
                return getDimensionFromStyle(element.getAttribute("style"), "height") || "auto";
            },
            renderHTML: () => {
                return {};
            },
        },
        style: {
            default: "",
            parseHTML: (element) => {
                console.log('style resize', element.getAttribute("style"));
                const styleAttr = element.getAttribute("style") || "";
                const widthAttr = element.getAttribute("width");
                const heightAttr = element.getAttribute("height");
                const parts = styleAttr
                    .split(";")
                    .map((part) => part.trim())
                    .filter(Boolean)
                    .filter((part) => !part.toLowerCase().startsWith("width:") && !part.toLowerCase().startsWith("height:"));

                if (widthAttr && widthAttr !== "auto") parts.push(`width:${widthAttr}`);
                if (heightAttr && heightAttr !== "auto") parts.push(`height:${heightAttr}`);

                return parts.join("; ");
            },
            renderHTML: (attributes) => {
                if (!attributes.style) return {};
                return { style: attributes.style };
            },
        },
        referrerpolicy: {
            default: "no-referrer",
            parseHTML: (element) => element.getAttribute("referrerpolicy") || "no-referrer",
            renderHTML: (attributes) => {
                if (!attributes.referrerpolicy) return {};
                return { referrerpolicy: attributes.referrerpolicy };
            },
        },
        class:'inline kurakura'
        
        };
    },

    renderHTML({ node, HTMLAttributes }) {
        const resolved = getResolvedImageSize(node);
        const style = buildImageStyle(node?.attrs?.style, resolved.width, resolved.height);
        const attrs: Record<string, string> = {
            ...HTMLAttributes,
            src: node.attrs.src,
            referrerpolicy: node?.attrs?.referrerpolicy || "no-referrer",
            crossorigin: "anonymous",
            loading: "lazy",
            // style,
            class: ["tiptap-inline-image", "inline", HTMLAttributes.class].filter(Boolean).join(" "),
        };

        return ["img", attrs];
    },

    addNodeView() {
    return (props: any) => {
        // use `any` because tiptap's NodeView props typing can differ across versions
        const { node, HTMLAttributes, updateAttributes } = props as any;

        const wrapper = document.createElement("div");
        wrapper.style.display = "inline-block";
        // use relative positioning so the handle can be absolutely positioned
        wrapper.style.position = "relative";
        wrapper.style.overflow = "hidden";
        wrapper.style.border = "1px dashed #ccc";
        wrapper.style.padding = "4px";
        wrapper.style.verticalAlign = "middle";

        const resolved = getResolvedImageSize(node);
        const parsedWidth = resolved.width;
        const parsedHeight = resolved.height;

        if (parsedWidth !== "auto") {
            wrapper.style.width = parsedWidth;
        }
        if (parsedHeight !== "auto") {
            wrapper.style.height = parsedHeight;
        }

        const img = document.createElement("img");
        img.src = node.attrs.src;
        img.style.display = "inline-block";
        // img.style.maxWidth = "100%";
        img.style.verticalAlign = "middle";
        // img.style.width = parsedWidth !== "auto" ? parsedWidth : "auto";
        // img.style.height = parsedHeight !== "auto" ? parsedHeight : "auto";
        img.setAttribute("referrerpolicy", node?.attrs?.referrerpolicy || "no-referrer");
        img.setAttribute("crossorigin", "anonymous");
        img.setAttribute("loading", "lazy");
        img.classList.add('inline')
        img.classList.add('kurakura')

        // apply HTMLAttributes (prevents "declared but never read")
        if (HTMLAttributes) {
            Object.entries(HTMLAttributes).forEach(([k, v]) => {
                if (v != null) img.setAttribute(k, String(v));
            });
        }

        wrapper.appendChild(img);

        // create right-edge handle (width only)
        const handle = document.createElement("div");
        handle.style.position = "absolute";
        handle.style.top = "0";
        handle.style.right = "0";
        handle.style.width = "14px";
        handle.style.bottom = "0";
        handle.style.cursor = "ew-resize";
        handle.style.background = "linear-gradient(90deg, rgba(0,0,0,0.04), rgba(0,0,0,0))";
        handle.style.borderLeft = "1px solid rgba(0,0,0,0.06)";
        handle.style.boxSizing = "border-box";
        handle.style.touchAction = "none";

        // create bottom-right corner handle (width + height)
        const handleBR = document.createElement("div");
        handleBR.style.position = "absolute";
        handleBR.style.width = "16px";
        handleBR.style.height = "16px";
        handleBR.style.right = "0";
        handleBR.style.bottom = "0";
        handleBR.style.cursor = "nwse-resize";
        handleBR.style.background = "rgba(0,0,0,0.08)";
        handleBR.style.border = "1px solid rgba(0,0,0,0.12)";
        handleBR.style.boxSizing = "border-box";
        handleBR.style.borderRadius = "2px";
        handleBR.style.touchAction = "none";

        wrapper.appendChild(handle);
        wrapper.appendChild(handleBR);

        // helper to toggle active outline during resize
        const prevBorder = wrapper.style.border;
        let uiHidden = false; // when true, hide handles and border (user wants plain HTML look)
        function setActive(active: boolean) {
            if (uiHidden) return; // don't show outline if UI intentionally hidden
            if (active) {
                wrapper.style.border = "2px solid #2563eb"; // blue outline
                wrapper.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.08)";
            } else {
                wrapper.style.border = prevBorder || "1px dashed #ccc";
                wrapper.style.boxShadow = "";
            }
        }

        // hide/show UI (handles + border) to present a plain HTML image when focused/clicked
        function hideUI() {
            uiHidden = true;
            wrapper.style.border = "none";
            wrapper.style.boxShadow = "";
            handle.style.display = "none";
            handleBR.style.display = "none";
        }

        function showUI() {
            uiHidden = false;
            wrapper.style.border = prevBorder || "1px dashed #ccc";
            handle.style.display = "";
            handleBR.style.display = "";
        }

        // make image focusable so we can detect focus/blur to hide UI
        img.tabIndex = 0;

        // hide UI when image is focused or clicked (to look like plain HTML)
        const onImgPointerDown = (ev: PointerEvent) => {
            // if pointer down on a handle, do nothing
            if ((ev.target as Node) === handle || (ev.target as Node) === handleBR) return;
            hideUI();
        };
        const onImgFocus = () => hideUI();
        const onImgBlur = () => showUI();
        img.addEventListener("pointerdown", onImgPointerDown);
        img.addEventListener("focus", onImgFocus);
        img.addEventListener("blur", onImgBlur);

        // restore UI when clicking outside
        const onDocPointerDown = (ev: PointerEvent) => {
            if (!wrapper.contains(ev.target as Node)) {
                showUI();
            }
        };
        document.addEventListener("pointerdown", onDocPointerDown);

        const applyResizeSize = (width: string, height: string) => {
            const nextWidth = width || parsedWidth || "auto";
            const nextHeight = height || parsedHeight || "auto";
            const nextStyle = buildImageStyle(node?.attrs?.style, nextWidth, nextHeight);

            wrapper.style.width = nextWidth;
            wrapper.style.height = nextHeight;
            img.style.width = nextWidth;
            img.style.height = nextHeight;
            img.setAttribute("style", nextStyle);
            
            updateAttributes({
                        width: wrapper.style.width,
                        height: wrapper.style.height,
                        style: nextStyle,
                    });     // if (typeof updateAttributes === "function") {
                //     updateAttributes({ width: nextWidth, height: nextHeight, style: nextStyle });
                // }
            // updateAttributes({ width: nextWidth, height: nextHeight, style: nextStyle });
            HTMLAttributes.style.width = nextWidth;
            HTMLAttributes.style.height = nextHeight;
        };

        // width-only dragging
        handle.addEventListener("pointerdown", (e: PointerEvent) => {
            e.preventDefault();
            e.stopPropagation();
            (e.target as Element).setPointerCapture?.(e.pointerId);

            const startX = e.clientX;
            const startWidth = wrapper.getBoundingClientRect().width;
            const prevUserSelect = document.body.style.userSelect;
            document.body.style.userSelect = "none";
            setActive(true);

            function onPointerMove(ev: PointerEvent) {
                const dx = ev.clientX - startX;
                const newWidth = Math.max(40, Math.round(startWidth + dx));
                const width = `${newWidth}px`;
                const height = wrapper.style.height || `${Math.round(wrapper.getBoundingClientRect().height)}px`;
                applyResizeSize(width, height);
            }

            function onPointerUp(ev: PointerEvent) {
                window.removeEventListener("pointermove", onPointerMove);
                window.removeEventListener("pointerup", onPointerUp);
                document.body.style.userSelect = prevUserSelect || "";
                setActive(false);

                const width = wrapper.style.width || `${Math.round(wrapper.getBoundingClientRect().width)}px`;
                const height = img.style.height && img.style.height !== "auto" ? img.style.height : (parsedHeight !== "auto" ? parsedHeight : "auto");
                applyResizeSize(width, height);
            }

            window.addEventListener("pointermove", onPointerMove);
            window.addEventListener("pointerup", onPointerUp);
        });

        // corner drag (width + height)
        handleBR.addEventListener("pointerdown", (e: PointerEvent) => {
            e.preventDefault();
            e.stopPropagation();
            (e.target as Element).setPointerCapture?.(e.pointerId);

            const startX = e.clientX;
            const startY = e.clientY;
            const rect = wrapper.getBoundingClientRect();
            const startWidth = rect.width;
            const startHeight = rect.height;
            const prevUserSelect = document.body.style.userSelect;
            document.body.style.userSelect = "none";
            setActive(true);

            function onPointerMove(ev: PointerEvent) {
                const dx = ev.clientX - startX;
                const dy = ev.clientY - startY;
                const newWidth = Math.max(40, Math.round(startWidth + dx));
                const newHeight = Math.max(40, Math.round(startHeight + dy));
                const width = `${newWidth}px`;
                const height = `${newHeight}px`;
                applyResizeSize(width, height);
            }

            function onPointerUp(ev: PointerEvent) {
                window.removeEventListener("pointermove", onPointerMove);
                window.removeEventListener("pointerup", onPointerUp);
                document.body.style.userSelect = prevUserSelect || "";
                setActive(false);

                const width = wrapper.style.width || `${Math.round(wrapper.getBoundingClientRect().width)}px`;
                const height = wrapper.style.height || `${Math.round(wrapper.getBoundingClientRect().height)}px`;
                applyResizeSize(width, height);
            }

            window.addEventListener("pointermove", onPointerMove);
            window.addEventListener("pointerup", onPointerUp);
        });

        return {
            dom: wrapper,
            destroy() {
                // cleanup listeners we attached
                const resolved = getResolvedImageSize(wrapper);
                // const style = buildImageStyle(wrapper?.style, resolved.width, resolved.height);
                img.style.height = resolved.height;
                img.style.width = resolved.width;
                img.setAttribute("style", wrapper?.style?.cssText || "");
       
                img.removeEventListener("pointerdown", onImgPointerDown);
                img.removeEventListener("focus", onImgFocus);
                img.removeEventListener("blur", onImgBlur);
                document.removeEventListener("pointerdown", onDocPointerDown);
            },
        };
        
    // addNodeView() {
    //     return ({ node, HTMLAttributes, updateAttributes }) => {
    //     const wrapper = document.createElement("div");
    //     wrapper.style.display = "inline-block";
    //     wrapper.style.resize = "horizontal";
    //     wrapper.style.overflow = "auto";
    //     wrapper.style.border = "1px dashed #ccc";
    //     wrapper.style.padding = "4px";

    //     const img = document.createElement("img");
    //     img.src = node.attrs.src;
    //     img.style.maxWidth = "100%";
    //     img.style.display = "block";

    //     wrapper.appendChild(img);

    //     // sync resize → update attribute (simple version)
    //     wrapper.addEventListener("mouseup", () => {
    //         updateAttributes({
    //         width: wrapper.style.width,
    //         });
    //     });

    //     return {
    //         dom: wrapper,
    //     };
        };
    },
    

    
});