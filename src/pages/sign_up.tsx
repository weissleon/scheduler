import { NextPage } from "next";
import { Box, Container } from "@mui/material";
import { SignUpBoard } from "@components/SignUpBoard";
import { useAddUser } from "@gql/hooks/useAddUser";

const SignUp: NextPage & { isPublic: boolean } = () => {
  const { isLoading: isProcessing, isError, isSuccess, mutate } = useAddUser();

  function handleSignUpClick(name: string, email: string, password: string) {
    mutate({ name, email, password });
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "grid", height: "calc(100vh - 64px)" }}
    >
      <Box py={2} justifySelf="center" alignSelf="center" position="relative">
        <SignUpBoard
          isProcessing={isProcessing}
          onSignUpClick={handleSignUpClick}
        />
      </Box>
    </Container>
  );
};
SignUp.isPublic = true;

export default SignUp;
