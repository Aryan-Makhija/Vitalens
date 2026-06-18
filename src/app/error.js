"use client";

import { useEffect, startTransition } from "react";

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1>Something went wrong</h1>

            <button
                onClick={() => {
                    startTransition(() => {
                        reset();
                    });
                }}
                className="mt-4 px-4 py-2 bg-black text-white"
            >
                Try Again
            </button>
        </div>
    );
}