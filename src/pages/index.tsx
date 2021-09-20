import { NextPage } from "next";
import { Container, Typography, AppBar, Toolbar, Button } from "@mui/material";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  return (
    <Container>
      <Typography>This is Landing Page</Typography>
    </Container>
  );
};

export default Home;
