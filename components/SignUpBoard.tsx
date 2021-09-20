import {
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState, useRef } from "react";
type Props = {
  isProcessing: boolean;
  onSignUpClick: (name: string, email: string, password: string) => any;
};

export const SignUpBoard = ({ onSignUpClick, isProcessing = false }: Props) => {
  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const [isError, setIsError] = useState<boolean>(false);
  function handleSignUpClick() {
    if (!validateForm()) return setIsError(() => true);
    onSignUpClick(
      nameRef!.current!.value,
      emailRef!.current!.value,
      passwordRef!.current!.value
    );
  }

  function validateForm() {
    if (!nameRef!.current!.value) return false;
    if (!emailRef!.current!.value) return false;
    if (!passwordRef!.current!.value) return false;
    return true;
  }

  return (
    <Paper>
      <Box p={2} display="flex" flexDirection="column" gap={2}>
        <TextField
          inputRef={nameRef}
          type="text"
          id="name"
          label="Name"
          variant="outlined"
        />
        <TextField
          inputRef={emailRef}
          type="email"
          id="email"
          label="Email"
          variant="outlined"
        />
        <TextField
          inputRef={passwordRef}
          type="password"
          id="password"
          label="Password"
          variant="outlined"
        />
        <Button variant="contained" onClick={handleSignUpClick}>
          {isProcessing ? (
            <CircularProgress color="inherit" size={30} />
          ) : (
            <Typography>Sign Up</Typography>
          )}
        </Button>
      </Box>
    </Paper>
  );
};
