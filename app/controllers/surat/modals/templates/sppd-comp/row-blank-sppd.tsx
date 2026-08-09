export default function RowBlankSppd({romawi}:{romawi:string}){
    return (
        <tr>
            <td className="border border-black px-2">
                <div className="flex flex-col justify-between min-h-24">
                    <table className="w-fit leading-4">
                        <tbody>
                            <tr>
                                <td className="align-top ps-1">{romawi}.</td>
                                <td className="align-top ps-2">Tiba di</td>
                                <td className="align-top ps-2">:</td>
                                <td className="align-top ps-2"></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="align-top ps-2">Pada Tanggal</td>
                                <td className="align-top ps-2">:</td>
                                <td className="align-top ps-2"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </td>
            <td className="border border-black px-2">
                <div className="flex flex-col justify-between  min-h-24">
                    <table className="w-fit leading-4">
                        <tbody>
                            <tr>
                                <td className="align-top ps-2">Berangkat Dari</td>
                                <td className="align-top ps-2">:</td>
                                <td className="align-top ps-2"></td>
                            </tr>
                            <tr><td className="align-top ps-2">Ke</td>
                                <td className="align-top ps-2">:</td>
                                <td className="align-top ps-2"></td>
                            </tr>
                            <tr>
                                <td className="align-top ps-2">Pada Tanggal</td>
                                <td className="align-top ps-2">:</td>
                                <td className="align-top ps-2"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    )
}