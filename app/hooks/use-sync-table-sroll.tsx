import { useEffect, useRef, useState } from "react";
import { useResizeDetector } from "react-resize-detector";

type UseSyncedTableScrollResult = {
  topScrollRef: React.RefObject<HTMLDivElement | null>;
  bottomScrollRef: React.RefObject<HTMLDivElement | null>;
  tableContainerRef: React.RefObject<HTMLDivElement | null>;
  tableWidth: number;
};

export function useSyncedTableScroll<T = unknown>(
  // dataRow: T[]
): UseSyncedTableScrollResult {
  const topScrollRef = useRef<HTMLDivElement>(null);
  const bottomScrollRef = useRef<HTMLDivElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [tableWidth, setTableWidth] = useState(0);

  const { width, height } = useResizeDetector({
    targetRef: tableContainerRef,
  });

  // Sinkronisasi scroll
  useEffect(() => {
    const top = topScrollRef.current;
    const bottom = bottomScrollRef.current;
    if (!top || !bottom) return;

    const syncScroll =
      (source: HTMLDivElement, target: HTMLDivElement) => () => {
        target.scrollLeft = source.scrollLeft;
      };

    const onTopScroll = syncScroll(top, bottom);
    const onBottomScroll = syncScroll(bottom, top);

    top.addEventListener("scroll", onTopScroll);
    bottom.addEventListener("scroll", onBottomScroll);

    return () => {
      top.removeEventListener("scroll", onTopScroll);
      bottom.removeEventListener("scroll", onBottomScroll);
    };
  }, []);

  // Hitung lebar tabel (FIXED)
  useEffect(() => {
    const container = tableContainerRef.current;
    if (!container) return;

    const measure = () => {
      const { scrollWidth, clientWidth } = container;

      if (scrollWidth > clientWidth) {
        setTableWidth(scrollWidth);
      } else {
        setTableWidth(0);
      }
    };

    // ⬅️ penting untuk first load
    requestAnimationFrame(measure);
  }, [width, height, 
    // dataRow
  ]);

  return {
    topScrollRef,
    bottomScrollRef,
    tableContainerRef,
    tableWidth,
  };
}


// import { useEffect,useRef, useState } from "react";
// import { useResizeDetector } from "react-resize-detector";

// type UseSyncedTableScrollResult = {
//     topScrollRef: React.RefObject<HTMLDivElement | null>;
//     bottomScrollRef: React.RefObject<HTMLDivElement | null>;
//     tableContainerRef: React.RefObject<HTMLDivElement | null>;
//     tableWidth: number;
// };

// export function useSyncedTableScroll<T = unknown>(dataRow: T[]): UseSyncedTableScrollResult {
//     const topScrollRef = useRef<HTMLDivElement>(null);
//     const bottomScrollRef = useRef<HTMLDivElement>(null);
//     const tableContainerRef = useRef<HTMLDivElement>(null);
//     const [tableWidth, setTableWidth] = useState<number>(0);

//     const { width, height } = useResizeDetector({ targetRef: tableContainerRef });

//     const diffSizes = (): boolean => {
//         if (tableContainerRef.current && width !== undefined) {
//         return tableContainerRef.current.clientWidth < width;
//         }
//         return false;
//     };

//     const isOverflowX = () => {
//         const el = tableContainerRef.current
//         if (!el) return false
//         return el.scrollWidth > el.clientWidth
//         }

//     // Sinkronisasi scroll
//     useEffect(() => {
//         const top = topScrollRef.current;
//         const bottom = bottomScrollRef.current;
//         if (!top || !bottom) return;

//         const syncScroll = (source: HTMLDivElement, target: HTMLDivElement) => {
//         return () => {
//             target.scrollLeft = source.scrollLeft;
//         };
//         };

//         const onTopScroll = syncScroll(top, bottom);
//         const onBottomScroll = syncScroll(bottom, top);

//         top.addEventListener("scroll", onTopScroll);
//         bottom.addEventListener("scroll", onBottomScroll);

//         return () => {
//         top.removeEventListener("scroll", onTopScroll);
//         bottom.removeEventListener("scroll", onBottomScroll);
//         };
//     }, []);

//     // Hitung lebar tabel   
//     useEffect(() => {
//         const container = tableContainerRef.current;
//         if (!container) return;

//         const updateWidth = () => {
//         if (diffSizes()) {
//             setTableWidth(container.scrollWidth);
//         } else {
//             setTableWidth(0);
//         }
//         };

//         updateWidth();
//     }, [width, height, dataRow]);

//     return {
//         topScrollRef,
//         bottomScrollRef,
//         tableContainerRef,
//         tableWidth,
//     };
// }
