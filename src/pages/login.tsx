import { login } from "@util/app/LoginManager";
import { NextPage } from "next";
import { FormEvent, useState, useContext, useEffect } from "react";
import { AccessTokenContext, AccessTokenContextType } from "./_app";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  // * Router
  const router = useRouter();

  // * Context
  const { token: accessToken, updateToken: setAccessToken } =
    useContext<AccessTokenContextType>(AccessTokenContext);

  // * States
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSuccessful, setIsSuccessful] = useState<boolean | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = await login({ email, password });
    if (token) {
      setAccessToken(token);
      router.replace("/");
    } else {
      setIsSuccessful((prev) => false);
    }
  };

  useEffect(() => {
    if (accessToken) router.replace("/");
  }, []);

  return (
    <div className="grid min-h-screen place-items-center">
      <Card minHeight={500} minWidth={800}>
        <form
          className="grid min-h-0 h-full place-items-center"
          onSubmit={handleSubmit}
          method="post"
        >
          <div>Login</div>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign in</button>
        </form>
      </Card>
    </div>
  );
};

type CardProp = {
  children?: any;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
};
const Card = ({
  children,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
}: CardProp) => {
  return (
    <div
      className={
        "relative px-4 py-2 min-w-[400px] min-h-[500px] h-[500px] shadow-md"
      }
    >
      {children}
    </div>
  );
};

export default Login;
