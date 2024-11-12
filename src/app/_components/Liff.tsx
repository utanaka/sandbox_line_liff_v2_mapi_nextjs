"use client";

import { useGlobalContext } from "@/hooks/useGlobalContext";
import type { FC } from "react";

export const Liff: FC = () => {
  const { liff, liffError } = useGlobalContext();

  return (
    <div>
      {liff && <p>LIFF init succeeded.</p>}
      {liffError && (
        <>
          <p>LIFF init failed.</p>
          <p>
            <code>{liffError}</code>
          </p>
        </>
      )}
    </div>
  );
}