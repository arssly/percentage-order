import Container from "@mui/material/Container";

export default function DefaultContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container maxWidth="lg" sx={{ my: 3 }}>
      {children}
    </Container>
  );
}
