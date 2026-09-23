import { useAppSelector } from "~/context-reduct/hook"
import LoginSiswa from "~/controllers/siswa-login/form-login-siswa";


export default function HomePage(){
    const auth = useAppSelector(state=>state.auth);
    
    return (
            <div className="h-full flex md:flex-col justify-evenly items-center gap-3 flex-col-reverse">
                    {
                        !auth.user && <LoginSiswa/>
                    }
                <div className="flex flex-col md:flex-row justify-center items-center">
                    <h3 className="text-4xl font-extrabold text-center">
                        Selamat Datang di Edurasa New Version
                    </h3>
                    <p>versi 1.0.1</p>
                </div>

            </div>
            
        )
}