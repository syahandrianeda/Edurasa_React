import { useEffect, useState } from "react";

export default function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const [showOnline, setShowOnline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOnline(true);

      const timer = window.setTimeout(() => {
        setShowOnline(false);
      }, 3000);

      return () => window.clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-9999 bg-destructive px-4 py-2 text-center text-sm font-medium text-white shadow">
        Anda sedang offline. Data yang ditampilkan berasal dari penyimpanan
        lokal.
      </div>
    );
  }

  if (showOnline) {
    return (
      <div className="fixed botoom-0 left-0 right-0 z-[9999] bg-green-600 px-4 py-2 text-center text-sm font-medium text-white shadow">
        Koneksi internet kembali.
      </div>
    );
  }

  return null;
}