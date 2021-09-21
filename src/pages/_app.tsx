import type { AppProps } from "next/app";
import Head from "next/head";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getLogInStatus } from "@util/app/AuthenticationManager";
import { QueryClient, QueryClientProvider } from "react-query";
import Appbar from "@components/Appbar";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { AuthnProvider } from "hooks/useAuthn";

export type AccessTokenContextType = {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
};

const queryClient = new QueryClient();

export const AccessTokenContext = createContext<AccessTokenContextType>({
  accessToken: null,
  setAccessToken: () => {},
});

function MyApp({ Component, pageProps }: AppProps) {
  // * States

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <QueryClientProvider client={queryClient}>
          <AuthnProvider>
            {!isLoading && (
              <>
                <Appbar />
                <Component {...pageProps} />
              </>
            )}
          </AuthnProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </>
  );
}
export default MyApp;
