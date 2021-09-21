import { NextPage } from "next";
import Cookies from "js-cookie";

const Test: NextPage = () => {
  const handleClick = () => {
    Cookies.set("hello", "world", { sameSite: "strict", secure: true });
  };

  return <button onClick={handleClick}>Set Cookie</button>;
};

export default Test;
