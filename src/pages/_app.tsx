import type { AppProps } from "next/app";
import Head from "next/head";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Appbar from "@components/Appbar";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { useAsyncEffect } from "use-async-effect";
import { fetchJson, METHOD_GET, METHOD_POST } from "@util/api/NetworkUtil";
import { useUpdateEffect } from "react-use";
import { useRouter } from "next/router";
import { TOKEN_TYPE, verifyToken } from "@util/api/TokenManager";

export type AccessTokenContextType = {
  token: string | null;
  updateToken: Dispatch<SetStateAction<string | null>>;
};

const queryClient = new QueryClient();

export const AccessTokenContext = createContext<AccessTokenContextType>({
  token: null,
  updateToken: () => {},
});

function MyApp({ Component, pageProps }: AppProps) {
  // * States
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const isFirstEnter = useRef(true);

  useAsyncEffect(
    async (isMounted) => {
      // Initial Authentication
      if (isFirstEnter.current) {
        isFirstEnter.current = false;
        // Does refreshToken exist?
        const { ok } = await fetchJson("/api/auth/token", {
          credentials: "include",
        });

        if (!ok) {
          await router.replace("/");
          setIsLoading(false);
          return;
        }

        // Request accessToken
        const payload = { action: "getNewAccessToken" };
        const { ok: successful, token: newToken } = await fetchJson(
          "/api/auth/token",
          {
            method: METHOD_POST,
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        if (isMounted()) {
          if (successful) setToken(newToken);
          if (
            !successful &&
            !(Component as typeof Component & { isPublic: boolean }).isPublic
          )
            await router.replace("/");
          setIsLoading(false);
        }
        return;
      }

      // Does accessToken exist?
      if (
        !token &&
        !(Component as typeof Component & { isPublic: boolean }).isPublic
      ) {
        return await router.replace("/");
      }

      // Validate accessToken
      const { isValid } = verifyToken(token as string, TOKEN_TYPE.ACCESS);

      // If invalid, issue a new accessToken
      if (!isValid) {
        const payload = { action: "getNewAccessToken" };
        const { ok: successful, token: newToken } = await fetchJson(
          "/api/auth/token",
          {
            method: METHOD_POST,
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        if (successful) setToken(newToken);
        if (
          !successful &&
          !(Component as typeof Component & { isPublic: boolean }).isPublic
        )
          await router.replace("/");
      }
    },
    [router.asPath]
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <CssBaseline />
      <AccessTokenContext.Provider
        value={{ token: token, updateToken: setToken }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <QueryClientProvider client={queryClient}>
            {!isLoading && (
              <>
                <Appbar
                  isSignedIn={token ? true : false}
                  onSignOut={async () => {
                    const { ok } = await fetchJson("/api/auth/logout", {
                      method: METHOD_GET,
                      credentials: "include",
                    });
                    if (ok) {
                      setToken(null);
                      router.back();
                    }
                  }}
                />
                <Component {...pageProps} />
              </>
            )}
          </QueryClientProvider>
        </LocalizationProvider>
      </AccessTokenContext.Provider>
    </>
  );
}
export default MyApp;
