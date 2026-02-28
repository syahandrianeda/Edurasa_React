import React, { useState, useEffect } from "react";

export function DigitalClock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString()); //

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000); // Perbarui setiap detik

    // Cleanup function untuk menghentikan timer saat komponen dilepas
    return () => {
      clearInterval(timer);
    };
  }, []); // Array dependensi kosong memastikan efek hanya berjalan sekali saat mount

  return (
    <div>{time}</div>
  );
}

export default DigitalClock;
