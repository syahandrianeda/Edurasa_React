import { ArrowDown, ArrowUp, Minus, Plus, Trash2, } from "lucide-react";

import { useCallback, useEffect, useRef, useState, type ChangeEvent, } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { syncPaketSoalData, } from "./paket-soal-data-sync";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import type { PaketSoalDesign } from "~/domain/paket-soal/result/paket-soal";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { CountBentukSoalPaket } from "~/domain/paket-soal/entities/count-bentuk-soal-paket";
import { ListBentukSoal } from "~/domain/bank-soal/list-bentuk-soal";
import InputSectionBentukSoal from "./sections/section-bentuk-soal";
import TooltipComp from "~/components/ui_edura/tooltip-comp";

export default function ToolbarContentJumlahSoal() {
        const { value, updateExtra, } = useFilterContext<PaketSoalDesign>();
    /*
     * State lokal sebagai sumber perubahan toolbar.
     *
     * value hanya digunakan sebagai nilai awal.
     */
    const [
        strukturSoal,
        setStrukturSoal,
    ] = useState<CountBentukSoalPaket[]>(
        value?.extra?.setting?.count_bentuk_soal ?? [],
    );

    const [
        backToOne,
        setBackToOne,
    ] = useState<boolean>(
        value?.extra?.setting?.nomorSoalUrut ?? true,
    );

    /**
     * Mengubah jumlah soal berdasarkan bentuk soal.
     */
    const onChangeCountSoal = useCallback(
        (index: number, value: string) => {
            const bentukSoal =
                ListBentukSoal[index];

            if (!bentukSoal) {
                return;
            }

            /*
             * Input kosong berarti session dihapus.
             */
            if (!value.trim()) {
                setStrukturSoal((prev) =>
                    prev.filter(
                        (item) =>
                            item.dataBentukSoal.name !==
                            bentukSoal.name,
                    ),
                );

                return;
            }

            const count = Number(value);

            /*
             * Lindungi state dari NaN dan angka negatif.
             */
            if (
                !Number.isFinite(count) ||
                count < 0
            ) {
                return;
            }

            /*
             * 0 berarti session dihapus.
             */
            if (count === 0) {
                setStrukturSoal((prev) =>
                    prev.filter(
                        (item) =>
                            item.dataBentukSoal.name !==
                            bentukSoal.name,
                    ),
                );

                return;
            }

            setStrukturSoal((prev) => {
                const existingIndex =
                    prev.findIndex(
                        (item) =>
                            item.dataBentukSoal.name ===
                            bentukSoal.name,
                    );

                const existing =
                    existingIndex >= 0
                        ? prev[existingIndex]
                        : undefined;

                /*
                 * Kalau session sudah ada, description lama
                 * dipertahankan.
                 *
                 * Kalau session baru, gunakan description
                 * bawaan bentuk soal.
                 */
                const newItem: CountBentukSoalPaket = {
                    dataBentukSoal: bentukSoal,
                    count,
                    description:
                        existing?.description ??
                        bentukSoal.petunjukPengisian ??
                        "",
                };

                /*
                 * Session baru.
                 */
                if (existingIndex === -1) {
                    return [
                        ...prev,
                        newItem,
                    ];
                }

                /*
                 * Session lama.
                 */
                const next = [...prev];

                next[existingIndex] =
                    newItem;

                return next;
            });
        },
        [],
    );

    /**
     * Naikkan posisi session.
     */
    const moveUp = useCallback(
        (index: number) => {
            if (index <= 0) {
                return;
            }

            setStrukturSoal((prev) => {
                if (index >= prev.length) {
                    return prev;
                }

                const next = [...prev];

                [
                    next[index - 1],
                    next[index],
                ] = [
                    next[index],
                    next[index - 1],
                ];

                return next;
            });
        },
        [],
    );

    /**
     * Turunkan posisi session.
     */
    const moveDown = useCallback(
        (index: number) => {
            setStrukturSoal((prev) => {
                if (
                    index < 0 ||
                    index >= prev.length - 1
                ) {
                    return prev;
                }

                const next = [...prev];

                [
                    next[index],
                    next[index + 1],
                ] = [
                    next[index + 1],
                    next[index],
                ];

                return next;
            });
        },
        [],
    );

    /**
     * Mengubah description session.
     */
    const onChangeDescription =
        useCallback(
            (
                e: ChangeEvent<HTMLInputElement>,
            ) => {
                const {
                    value: description,
                    name,
                } = e.currentTarget;

                const index = Number(name);

                setStrukturSoal((prev) =>
                    prev.map(
                        (item, itemIndex) =>
                            itemIndex === index
                                ? {
                                      ...item,
                                      description,
                                  }
                                : item,
                    ),
                );
            },
            [],
        );

    /**
     * =====================================================
     * SINKRONISASI
     * =====================================================
     *
     * Sengaja TIDAK memasukkan updateExtra ke dependency.
     *
     * Alasannya:
     *
     * updateExtra berasal dari Provider dan function tersebut
     * dibuat ulang setiap render.
     *
     * Jika dimasukkan ke dependency:
     *
     * updateExtra()
     *     ↓
     * Provider update
     *     ↓
     * render
     *     ↓
     * updateExtra reference baru
     *     ↓
     * useEffect lagi
     *     ↓
     * updateExtra()
     *
     * dan seterusnya.
     *
     * Effect ini hanya perlu berjalan ketika data yang memang
     * dikontrol oleh component berubah.
     */
    useEffect(() => {
        updateExtra((draft) => {
            const setting =
                (draft.setting ??
                    {}) as NonNullable<
                    typeof draft.setting
                >;

            /*
             * Simpan struktur jumlah soal.
             */
            setting.count_bentuk_soal =
                strukturSoal;

            /*
             * Simpan mode penomoran.
             */
            setting.nomorSoalUrut =
                backToOne;

            draft.setting = setting;

            /*
             * Ambil data desain sebelumnya.
             *
             * Jika belum ada, gunakan array kosong.
             */
            const currentData =
                Array.isArray(draft.data)
                    ? draft.data
                    : [];

            /*
             * Sinkronkan session dan data soal.
             */
            draft.data =
                syncPaketSoalData(
                    currentData,
                    strukturSoal,
                    backToOne,
                );
        });

        /*
         * JANGAN menambahkan updateExtra di sini.
         *
         * Provider Anda membuat updateExtra sebagai function
         * baru setiap render.
         */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        strukturSoal,
        backToOne,
    ]);

    return (
        <div className="grid md:grid-cols-3 grid-cols-1 bg-linear-to-br from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 px-1 py-6 gap-1">
            <div className="max-h-[calc(100vh-22rem)] overflow-y-auto scrol-h-custom inner-shadow-sky-700 text-xs md:col-span-1 border shadow-sky-300 shadow-sm bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-lg outline-ring py-2 px-2">
                {ListBentukSoal.map((m, i) => (
                    <InputSectionBentukSoal
                        key={i}
                        initialValue={
                            strukturSoal
                                .find(
                                    (s) =>
                                        s.dataBentukSoal.name ===
                                        m.name
                                )
                                ?.count
                                ?.toString() ?? ""
                        }
                        onChangeCountSoal={(value) =>
                            onChangeCountSoal(i, value)
                        }
                        label={m.shortName ?? ""}
                        id={m.name}
                    />
                ))}
            </div>

            <div className="inner-shadow-sky-700 text-xs md:col-span-2 border shadow-sky-300 shadow-sm bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-lg outline-ring py-2 px-2">
                {strukturSoal.map((m, i) => {
                    const startNumber = backToOne
                        ? 1
                        : strukturSoal
                              .slice(0, i)
                              .reduce(
                                  (total, item) =>
                                      total + item.count,
                                  1
                              );

                    return (
                        <div
                            key={m.dataBentukSoal.name}
                            className="flex bg-white dark:text-black"
                        >
                            <ol
                                start={i + 1}
                                className="flex-1 border list-inside list-[upper-roman] ps-2"
                            >
                                <li className="list-item flex-1">
                                    <input
                                        type="text"
                                        name={i.toString()}
                                        value={m.description}
                                        onChange={
                                            onChangeDescription
                                        }
                                        className="w-11/12 inline-block border-0 outline-0 ring-0 focus-within:ring-0 focus-visible:border-0"
                                    />

                                    <ol
                                        start={
                                            i === 0
                                                ? 1
                                                : startNumber
                                        }
                                        className="list-inside list-decimal ps-5"
                                    >
                                        <li>...</li>
                                        <li>...</li>
                                        <li>
                                            hingga {m.count} soal
                                        </li>
                                    </ol>
                                </li>
                            </ol>

                            <div className="border flex justify-center items-center">
                                <TooltipComp content="Naikkan Posisi">
                                    <Button
                                        variant="ghost"
                                        disabled={i === 0}
                                        className="p-0"
                                        onClick={() =>
                                            moveUp(i)
                                        }
                                    >
                                        🔼
                                    </Button>
                                </TooltipComp>

                                <TooltipComp content="Turunkan Posisi">
                                    <Button
                                        variant="ghost"
                                        disabled={
                                            i ===
                                            strukturSoal.length -
                                                1
                                        }
                                        className="p-0"
                                        onClick={() =>
                                            moveDown(i)
                                        }
                                    >
                                        🔽
                                    </Button>
                                </TooltipComp>
                            </div>
                        </div>
                    );
                })}

                <label className="select-none block mt-4 align-middle w-full">
                    <input
                        type="checkbox"
                        checked={backToOne}
                        onChange={() =>
                            setBackToOne(
                                (prev) => !prev
                            )
                        }
                    />{" "}
                    {backToOne
                        ? "Nomor Soal kembali ke nomor 1"
                        : "Nomor soal melanjutkan dari sesion sebelumnya"}
                </label>
            </div>
        </div>
    );
}