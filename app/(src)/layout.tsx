"use client";

import "../globals.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ChakraProvider } from "@chakra-ui/react";

const queryClient = new QueryClient();

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client_id = process.env.NEXT_GOOGLE_CLIENT_ID;
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <ThemeProvider>
          <ChakraProvider>
            <GoogleOAuthProvider clientId='667264856835-eh7g0tcgq7mrpnrekok006q0kcglskfp.apps.googleusercontent.com'>
              <main>{children}</main>
            </GoogleOAuthProvider>
          </ChakraProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
