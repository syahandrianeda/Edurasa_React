/// <reference types="vite-plugin-pwa/client" />
import { useEffect } from "react";
import { registerSW } from "virtual:pwa-register";

export default function PwaRegister() {
  useEffect(() => {
    registerSW({
      immediate: true,
    });
  }, []);

  return null;
}