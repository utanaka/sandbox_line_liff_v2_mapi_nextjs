"use client";

import { GlobalContext } from "@/contexts/GlobalContext";
import type { Liff } from "@line/liff";
import { useCallback, useEffect, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);

  const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

  if (!liffId) {
    throw new Error("NEXT_PUBLIC_LIFF_ID is not defined");
  }

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    import("@line/liff")
      .then((liff) => liff.default)
      .then((liff) => {
        console.log("LIFF init...");
        liff
          .init({ liffId })
          .then(() => {
            console.log("LIFF init succeeded.");
            setLiffObject(liff);
          })
          .catch((error: Error) => {
            console.log("LIFF init failed.");
            setLiffError(error.toString());
          });
      });
  }, [liffId]);

  return (
    <GlobalContext.Provider value={{ liff: liffObject, liffError: liffError }}>
      <div>{children}</div>
    </GlobalContext.Provider>
  );
}