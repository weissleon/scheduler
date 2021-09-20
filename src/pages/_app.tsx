import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
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

export type AccessTokenContextType = {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
};

const queryClient = new QueryClient();

export const AccessTokenContext = createContext<AccessTokenContextType>({
  accessToken: null,
  setAccessToken: () => {},
});

function MyApp({ Component, pageProps, token }: AppProps & { token: string }) {
  // * States
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const token = await getLogInStatus();
      setAccessToken(token);
      setIsLoading((prev) => false);
    })();
  }, []);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
          {!isLoading && <Component {...pageProps} />}
        </AccessTokenContext.Provider>
      </QueryClientProvider>
    </>
  );
}
export default MyApp;
