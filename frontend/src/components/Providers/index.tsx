'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

export type ProvidersProps = {
    children: React.ReactNode;
}

const client =  new QueryClient();
export function Providers({ children }: ProvidersProps) {
    return (
        <>
        <ToastContainer />
             <QueryClientProvider client={client}>
               {children}
            </QueryClientProvider>
        </>
    )
}