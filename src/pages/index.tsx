import { GetServerSideProps, NextPage } from "next";
import { TOKEN_TYPE, verifyToken } from "@util/api/TokenAPI";

const Entry: NextPage = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Currently there is no refreshToken validation.
  let { refreshToken } = context.req.cookies;
  if (refreshToken) {
    const { isValid } = verifyToken(refreshToken, TOKEN_TYPE.REFRESH);
    if (isValid)
      return { redirect: { destination: "/schedule", permanent: false } };
  }

  // If the user is not logged in, redirect to the landing page.
  return {
    redirect: { destination: "/landing", permanent: false },
  };
};

export default Entry;
