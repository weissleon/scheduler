import { NextPage } from "next";
import { FormEvent, useContext, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { fetchJson, METHOD_POST } from "@util/api/NetworkUtil";
import { AccessTokenContext } from "./_app";

const SignIn: NextPage & { isPublic: boolean } = () => {
  // * Router
  const router = useRouter();

  // * Context
  const { updateToken } = useContext(AccessTokenContext);

  // * States
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;

    const payload = { email: email, password: password };

    const { accessToken } = await fetchJson("/api/auth/login", {
      method: METHOD_POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (accessToken) {
      updateToken(accessToken);
      router.replace("/schedule");
    }
  };

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
          <Button variant="contained" type="submit">
            Sign in
          </Button>
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

SignIn.isPublic = true;

export default SignIn;
