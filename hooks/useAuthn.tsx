import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useQuery } from "react-query";

const AuthnContext = createContext<string | null>(null);

type Props = {
  children: ReactNode;
};
export const AuthnProvider = ({ children }: Props) => {
  const { isLoading, isError, data } = useQuery("refreshToken", async () => {
    await fetch("/api/auth/refresh_token");
  });

  console.log(data);

  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <AuthnContext.Provider value={accessToken}>
      {children}
    </AuthnContext.Provider>
  );
};

export const useAuthn = () => useContext(AuthnContext);
