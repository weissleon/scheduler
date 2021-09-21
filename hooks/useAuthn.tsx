import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useQuery } from "react-query";

const AuthnContext = createContext<{
  token: string | null;
  updateToken: (newToken: string) => void;
  revokeToken: () => void;
}>({ token: null, updateToken: () => {}, revokeToken: () => {} });

type Props = {
  children: ReactNode;
};
export const AuthnProvider = ({ children }: Props) => {
  const { isLoading, isError, data } = useQuery("refreshToken", async () => {
    await fetch("/api/auth/refresh_token");
  });

  const [accessToken, setAccessToken] = useState<string | null>(null);

  const updateToken = (newToken: string) => {
    setAccessToken(newToken);
  };
  const revokeToken = () => {
    setAccessToken(null);
  };

  return (
    <AuthnContext.Provider
      value={{ token: accessToken, updateToken, revokeToken }}
    >
      {children}
    </AuthnContext.Provider>
  );
};

export const useAuthn = () => useContext(AuthnContext);
