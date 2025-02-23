import { useForm } from "@mantine/form";
import { TextInput, Button, Container, Title, Paper } from "@mantine/core";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { login } from "../../../services/Auth";
import { useCart } from "../../contexts/CartContext";
import { User } from "../../../Types/types";
import { toast } from "react-toastify";

export default function Login() {
  type FormValues = {
    email: string;
  };

  const { addUser } = useCart();

  const form = useForm<FormValues>({
    initialValues: {
      email: "",
    },
  });

  const handleSubmit = (values: FormValues): void => {
    console.log(values);
    login(values.email)
      .then((response) => {
        const user = response.user as User;

        addUser(user);
        toast.success("Login realizado com sucesso!");
        window.location.href = "/";
      })
      .catch(() => {
        toast.error(`Erro ao realizar login`);
      });
  };

  return (
    <div className="bg-yellow-50 min-h-screen">
      <Navbar />
      <Container
        size="sm"
        className="h-[70vh] flex flex-col items-center justify-center"
      >
        <Title className="mb-8 text-center">Login</Title>
        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          className="w-full"
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Email"
              placeholder="seu.email@exemplo.com"
              {...form.getInputProps("email")}
              required
            />
            <Button type="submit" fullWidth mt="xl">
              Entrar
            </Button>
          </form>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
}
