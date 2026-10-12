import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { AnalisisInstrumenSummary } from "~/domain/analisis-instrumen/AnalisisInstrumenSummaryType";

export default function CardsSummaryRekomendasi ({summary}:{summary:AnalisisInstrumenSummary}){
    return (
        <>
        {summary.rekomendasi.pesan.length > 0 && (

                <Card>

                    <CardHeader className="pb-3">

                        <CardTitle className="text-sm">
                            Rekomendasi
                        </CardTitle>

                    </CardHeader>

                    <CardContent className="space-y-1">

                        {summary.rekomendasi.pesan.map(
                            (pesan, index) => (

                                <p
                                    key={index}
                                    className="text-xs text-muted-foreground"
                                >
                                    • {pesan}
                                </p>

                            )
                        )}

                    </CardContent>

                </Card>

            )}
        </>
    )
}