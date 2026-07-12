import { useEffect }
from "react";

import { useState }
from "react";

import { useReactIntegration }
from "../integration/useReactIntegration";

import type { ReactLifecycle }
from "./ReactLifecycle";

export function useReactLifecycle():ReactLifecycle{

    useReactIntegration();

    const [mounted,setMounted]=

        useState(false);

    useEffect(()=>{

        setMounted(true);

        return()=>{

            setMounted(false);

        };

    },[]);

    return{

        mounted

    };

}