import { useMemo, useState } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";

import { Input } from "~/components/ui/input";

import { Button } from "~/components/ui/button";

import { Search, X } from "lucide-react";
import type { AnalisisInstrumenResult, AnalisisInstrumenSoalFinal } from "~/domain/analisis-instrumen/AnalisisInstrumenResultType";
import { AnalisisInstrumenSummary } from "./AnalisisInstrumenSummary";
import { AnalisisInstrumenTable } from "./AnalisisInstrumenTable";
import { AnalisisInstrumenDetailSheet } from "./AnalisisInstrumenDetailSheet";




interface Props {
    result: AnalisisInstrumenResult | null;
    isLoading?: boolean;
    error?: string | null;
}

type StatusFilter =
    | "semua"
    | AnalisisInstrumenSoalFinal["status"];

export function AnalisisInstrumenView({
    result,
    isLoading = false,
    error = null,
}: Props) {

    const [statusFilter, setStatusFilter] =
        useState<StatusFilter>("semua");

    const [bentukFilter, setBentukFilter] =
        useState<string>("semua");

    const [search, setSearch] =
        useState("");

    const [selectedSoal, setSelectedSoal] =
        useState<AnalisisInstrumenSoalFinal | null>(null);


    /**
     * ==========================================================
     * FILTER BENTUK SOAL
     * ==========================================================
     */

    const bentukSoal = useMemo(() => {

        if (!result) {
            return [];
        }

        return Array.from(
            new Set(
                result.soal.map(
                    item => item.bentuk_soal
                )
            )
        );

    }, [result]);


    /**
     * ==========================================================
     * FILTER DATA
     * ==========================================================
     */

    const filteredSoal = useMemo(() => {

        if (!result) {
            return [];
        }

        const keyword =
            search.trim().toLowerCase();

        return result.soal.filter(item => {

            const matchStatus =
                statusFilter === "semua" ||
                item.status === statusFilter;

            const matchBentuk =
                bentukFilter === "semua" ||
                item.bentuk_soal === bentukFilter;

            const matchSearch =
                keyword === "" ||
                String(item.no_prefix)
                    .includes(keyword) ||
                item.bentuk_soal
                    .toLowerCase()
                    .includes(keyword);

            return (
                matchStatus &&
                matchBentuk &&
                matchSearch
            );
        });

    }, [
        result,
        statusFilter,
        bentukFilter,
        search,
    ]);


    const hasFilter =
        statusFilter !== "semua" ||
        bentukFilter !== "semua" ||
        search.trim() !== "";


    function resetFilter() {
        setStatusFilter("semua");
        setBentukFilter("semua");
        setSearch("");
    }


    /**
     * ==========================================================
     * LOADING
     * ==========================================================
     */

    if (isLoading) {

        return (
            <Card>
                <CardContent className="py-10">

                    <div className="flex flex-col items-center gap-2 text-center">

                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" />

                        <p className="text-sm font-medium">
                            Menganalisis instrumen...
                        </p>

                        <p className="text-xs text-muted-foreground">
                            Mohon tunggu sebentar.
                        </p>

                    </div>

                </CardContent>
            </Card>
        );
    }


    /**
     * ==========================================================
     * ERROR
     * ==========================================================
     */

    if (error) {

        return (
            <Card>

                <CardContent className="py-10">

                    <div className="flex flex-col items-center gap-2 text-center">

                        <p className="text-sm font-medium">
                            Analisis instrumen gagal
                        </p>

                        <p className="max-w-md text-xs text-muted-foreground">
                            {error}
                        </p>

                    </div>

                </CardContent>

            </Card>
        );
    }


    /**
     * ==========================================================
     * EMPTY
     * ==========================================================
     */

    if (!result) {

        return (
            <Card>

                <CardContent className="py-10">

                    <div className="text-center">

                        <p className="text-sm font-medium">
                            Data analisis belum tersedia
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Belum ada data yang dapat dianalisis.
                        </p>

                    </div>

                </CardContent>

            </Card>
        );
    }


    return (
        <div className="space-y-4">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div>

                <h2 className="text-base font-semibold">
                    Analisis Instrumen Soal : {result.publikasi.nama_publikasi}
                </h2>

                <p className="text-xs text-muted-foreground">
                    {result.jumlahSoal} soal ·{" "}
                    {result.jumlahPeserta} peserta dianalisis
                </p>

            </div>


            {/* ==================================================
                UI-1
                SUMMARY + DISTRIBUSI
            ================================================== */}

            <AnalisisInstrumenSummary
                summary={result.summary}
            />


            {/* ==================================================
                UI-2
                FILTER
            ================================================== */}

            <Card className="print:hidden">

                <CardHeader className="pb-3">

                    <CardTitle className="text-sm">
                        Daftar Soal
                    </CardTitle>

                    <CardDescription>
                        Pilih soal untuk melihat detail analisis.
                    </CardDescription>

                </CardHeader>

                <CardContent>

                    <div className="flex flex-col gap-2 md:flex-row">

                        <div className="relative flex-1">

                            <Search
                                className="
                                    absolute
                                    left-2.5
                                    top-1/2
                                    h-3.5
                                    w-3.5
                                    -translate-y-1/2
                                    text-muted-foreground
                                "
                            />

                            <Input
                                value={search}
                                onChange={event =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Cari nomor soal..."
                                className="h-8 pl-8 text-xs"
                            />

                        </div>


                        <Select
                            value={statusFilter}
                            onValueChange={value =>
                                setStatusFilter(
                                    value as StatusFilter
                                )
                            }
                        >

                            <SelectTrigger className="h-8 w-full text-xs md:w-44">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="semua">
                                    Semua status
                                </SelectItem>

                                <SelectItem value="baik">
                                    Baik
                                </SelectItem>

                                <SelectItem value="cukup">
                                    Cukup
                                </SelectItem>

                                <SelectItem value="perlu_ditinjau">
                                    Perlu ditinjau
                                </SelectItem>

                                <SelectItem value="bermasalah">
                                    Bermasalah
                                </SelectItem>

                                <SelectItem value="tidak_dapat_dianalisis">
                                    Tidak dianalisis
                                </SelectItem>

                            </SelectContent>

                        </Select>


                        <Select
                            value={bentukFilter}
                            onValueChange={setBentukFilter}
                        >

                            <SelectTrigger className="h-8 w-full text-xs md:w-44">
                                <SelectValue placeholder="Bentuk soal" />
                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="semua">
                                    Semua bentuk
                                </SelectItem>

                                {bentukSoal.map(bentuk => (

                                    <SelectItem
                                        key={bentuk}
                                        value={bentuk}
                                    >
                                        {bentuk}
                                    </SelectItem>

                                ))}

                            </SelectContent>

                        </Select>


                        {hasFilter && (

                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={resetFilter}
                                className="h-8 px-2 text-xs"
                            >
                                <X className="mr-1 h-3.5 w-3.5" />
                                Reset
                            </Button>

                        )}

                    </div>

                </CardContent>

            </Card>


            {/* ==================================================
                UI-2
                TABLE
            ================================================== */}

            <AnalisisInstrumenTable
                data={filteredSoal}
                total={result.soal.length}
                onSelect={setSelectedSoal}
            />


            {/* ==================================================
                UI-3 + UI-4
                DETAIL SHEET
            ================================================== */}

            <AnalisisInstrumenDetailSheet
                item={selectedSoal}
                open={selectedSoal !== null}
                onOpenChange={open => {
                    if (!open) {
                        setSelectedSoal(null);
                    }
                }}
            />

        </div>
    );
}