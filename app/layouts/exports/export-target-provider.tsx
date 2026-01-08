import * as React from 'react';

/* =========================================================
 * Types
 * ========================================================= */

type ExportTarget = HTMLElement | null;

type ExportTargetRegistry = {
  register: (key: string, el: ExportTarget) => void;
  unregister: (key: string) => void;
  get: (key: string) => ExportTarget;
};

/* =========================================================
 * Context
 * ========================================================= */

const ExportTargetContext =
  React.createContext<ExportTargetRegistry | null>(null);

/* =========================================================
 * Provider
 * ========================================================= */

export function ExportTargetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const registry = React.useRef<Map<string, ExportTarget>>(new Map());

  const register = React.useCallback(
    (key: string, el: ExportTarget) => {
      registry.current.set(key, el);
    },
    []
  );

  const unregister = React.useCallback((key: string) => {
    registry.current.delete(key);
  }, []);

  const get = React.useCallback((key: string) => {
    return registry.current.get(key) ?? null;
  }, []);

  const value = React.useMemo(
    () => ({ register, unregister, get }),
    [register, unregister, get]
  );

  return (
    <ExportTargetContext.Provider value={value}>
      {children}
    </ExportTargetContext.Provider>
  );
}

/* =========================================================
 * Hook Overloads  ⬅️⬅️⬅️ INI YANG KAMU KURANG
 * ========================================================= */

// MODE 1 — dipakai di toolbar / sidebar
export function useExportTarget(): {
  getTarget: (key: string) => ExportTarget;
};

// MODE 2 — dipakai di komponen target (ref)
export function useExportTarget(
  key: string
): (el: HTMLElement | null) => void;

/* =========================================================
 * Hook Implementation
 * ========================================================= */

export function useExportTarget(key?: string) {
  const context = React.useContext(ExportTargetContext);

  if (!context) {
    throw new Error(
      'useExportTarget must be used within ExportTargetProvider'
    );
  }

  const { register, unregister, get } = context;

  // 🔹 untuk komponen target export
  const refCallback = React.useCallback(
    (el: HTMLElement | null) => {
      if (!key) return;

      if (el) {
        register(key, el);
      } else {
        unregister(key);
      }
    },
    [key, register, unregister]
  );

  // 🔹 untuk toolbar / sidebar
  const getTarget = React.useCallback(
    (targetKey: string) => get(targetKey),
    [get]
  );

  if (typeof key === 'string') {
    return refCallback;
  }

  return { getTarget };
}
