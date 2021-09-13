import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import App from "next/app";
import { getLogInStatus } from "@util/app/AuthenticationManager";

export type AccessTokenContextType = {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
};

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
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      {!isLoading && <Component {...pageProps} />}
    </AccessTokenContext.Provider>
  );
}
export default MyApp;

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   const token = await getLogInStatus();
//   console.log(`Received token is: ${token}`);
//   if (typeof document !== "undefined") console.log("Now on the client-side!");
//   return { token: token, ...appProps };
// };
