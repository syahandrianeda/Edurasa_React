import {useState} from 'react';
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import { Input } from "~/components/ui/input";

type LoginType = "nisn" | "token";
interface LoginSiswaParams {
    type: LoginType;
    value: string;
}

export default function LoginSiswa() {
    const [nomor, setNomor] = useState("");

    const handleLogin = () => {
        const value = nomor.trim();

        if (!value) {

            alert("Nomor NISN/Token belum diisi");
            return;
        }

        const type: LoginType =
            value.length === 10 ? "nisn" : "token";

        const params: LoginSiswaParams = {
            type,
            value,
        };

        console.log("Parameter login:", params);
        alert("Dalam proses pengembangan")
        // Selanjutnya panggil service login
        // loginSiswaService(params);
    };

    return (
        <div className="border-2 rounded-2xl border-sky-300 bg-sky-100 shadow-2xl shadow-purple-600 min-h-32 w-11/12 md:w-1/3">
            <fieldset className="p-4 flex flex-col justify-between gap-3 items-center h-full">
                <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="Masukkan NISN/Token Siswa"
                    className="min-w-full"
                    value={nomor}
                    onChange={(e) => {
                        const value = e.target.value;

                        // Hanya menerima angka
                        if (/^\d*$/.test(value)) {
                            setNomor(value);
                        }
                    }}
                />

                <ButtonCommitAwesome
                    labelButton="Login"
                    className="px-4 py-0 mx-auto text-[12px]"
                    onClick={handleLogin}
                />
            </fieldset>
        </div>
    );
}