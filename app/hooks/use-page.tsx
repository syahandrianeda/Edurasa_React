import { useEffect, useState } from "react";
import AuthServiceImplements from "~/infrastructures/services/auth-service-implements";
// import { AuthUseCase } from "~/domain/auth/AuthUseCase";

export function usePage() {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        // const uc = new AuthUseCase();
        const uc = new AuthServiceImplements();
    setUser(uc.getSessionSync());
        setLoading(false);
    }, []);

    return { user, isLoading };
}
