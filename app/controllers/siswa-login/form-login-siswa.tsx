
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import { Input } from "~/components/ui/input";

import AuthSiswaServiceImplements from "~/infrastructures/services/auth-siswa-service-implements";
import DTOUserSiswa from "~/dtos/dto-user-siswa";

import { saveSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { clearSessionApp } from "~/infrastructures/session-storage/app-session";

import { store } from "~/context-reduct/redux-provider";
import { setCredentials } from "~/context-reduct/global-state/auth-slice";
import { setFokusRombel } from "~/context-reduct/global-state/fokus-rombel-slice";
import { resetSiswa } from "~/context-reduct/global-state/siswa-slice";

import { useMobileNavigation } from "~/hooks/use-mobile-navigation";

type LoginType = "nisn" | "token";

interface LoginSiswaParams {
    type: LoginType;
    value: string;
}

export default function LoginSiswa() {
    const [nomor, setNomor] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cleanup = useMobileNavigation();

    const handleLogin = async () => {
        const value = nomor.trim();

        if (!value) {
            setMessage("Nomor NISN/Token belum diisi");
            return;
        }

        const type: LoginType =
            value.length === 10 ? "nisn" : "token";

        const params: LoginSiswaParams = {
            type,
            value,
        };

        console.log("Parameter login:", params);

        setMessage("");

        const service = new AuthSiswaServiceImplements();

        toast.promise(
            service.login(value, type),
            {
                loading: "Sedang mencoba login",

                success: (respon) => {
                    console.log("Response login:", respon);

                    if (
                        respon.success &&
                        respon.data &&
                        respon.data.status === "aktif"
                    ) {
                        const userAuth =
                            DTOUserSiswa.fromResponAkun(
                                respon.data
                            );

                        saveSessionRombel(
                            userAuth.rombel
                        );

                        store.dispatch(
                            setCredentials({
                                user: respon.data,
                                name: "auth",
                                loaded: true,
                            })
                        );

                        store.dispatch(
                            setFokusRombel({
                                value: userAuth.rombel,
                                name: "fokusRombel",
                                loaded: true,
                            })
                        );

                        setMessage("");

                        // Navigasi client-side
                        navigate("/menu"); 

                        return "Login berhasil";
                    }

                    // Login tidak berhasil atau akun tidak aktif
                    setMessage(respon.message);

                    cleanup();

                    clearSessionApp();

                    localStorage.clear();

                    dispatch(
                        setCredentials({
                            user: null,
                            name: "auth",
                            loaded: false,
                        })
                    );

                    dispatch(
                        setFokusRombel({
                            value: undefined,
                            name: "fokusRombel",
                            loaded: false,
                        })
                    );

                    dispatch(resetSiswa());

                    return respon.message;
                },

                error: (err) => {
                    console.log("Error login:", err);

                    const errorMessage =
                        err instanceof Error
                            ? err.message
                            : String(err);

                    setMessage("Error: " + errorMessage);

                    return "Gagal login | " + errorMessage;
                },
            }
        );
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

                {message && (
                    <p className="text-sm text-red-600">
                        {message}
                    </p>
                )}
            </fieldset>
        </div>
    );
}