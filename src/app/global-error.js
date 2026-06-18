"use client";

import { useEffect, startTransition } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6] text-center px-6">
          
          <h1 className="text-3xl md:text-4xl font-bold text-[#2D3331]">
            Something went wrong
          </h1>

          <p className="mt-3 text-[#5C6361] max-w-md">
            We encountered an unexpected error. Please try again or refresh the page.
          </p>

          <button
            onClick={() => {
              startTransition(() => {
                reset();
              });
            }}
            className="mt-6 px-6 py-3 rounded-xl bg-[#4A675D] text-white font-semibold hover:bg-[#3D564D] transition"
          >
            Reload Application
          </button>

        </div>
      </body>
    </html>
  );
}