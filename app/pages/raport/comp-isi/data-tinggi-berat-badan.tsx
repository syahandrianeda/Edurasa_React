import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";

export default function DataTinggiBeratBadan(){
 return (
    <TableWithScrolling className="w-7/12">
        <thead>
            <TRowEdura>
                <ThEdura rowSpan={2} className="w-12">No</ThEdura>
                <ThEdura rowSpan={2}>Aspek Yang Diukur</ThEdura>
                <ThEdura colSpan={2}>Semester</ThEdura>
            </TRowEdura>
            <TRowEdura>
                <ThEdura>1</ThEdura>
                <ThEdura>2</ThEdura>
            </TRowEdura>
        </thead>
        <tbody>
            <TRowEdura>
                <TdEdura className="text-center">1.</TdEdura>
                <TdEdura>Tinggi Badan (cm)</TdEdura>
                <TdEdura></TdEdura>
                <TdEdura></TdEdura>
            </TRowEdura>
            <TRowEdura>
                <TdEdura className="text-center">2.</TdEdura>
                <TdEdura>Berat Badan (Kg)</TdEdura>
                <TdEdura></TdEdura>
                <TdEdura></TdEdura>
            </TRowEdura>
        </tbody>
    </TableWithScrolling>
 )   
}