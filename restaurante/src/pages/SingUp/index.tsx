import { TextInput, Button, Container, Paper } from "@mantine/core";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useForm } from "@mantine/form";
import { User } from "../../../Types/types";
import { register } from "../../../services/Auth/index";


export default function Register() {
  const form = useForm<User>({
    initialValues: {
      id: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      createdAt: "",
    },

    validate: {
      name: (value) => (value.trim().length > 0 ? null : "Nome é obrigatório"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
      phone: (value) =>
        value.trim().length > 0 ? null : "Telefone é obrigatório",
      address: (value) =>
        value.trim().length > 0 ? null : "Endereço é obrigatório",
    },
  });

  const handleSubmit = (values: User) => {
    console.log(values);
    register(values).then(() => {
      alert("Cadastro realizado com sucesso! Por favor, faça login.");
    });
  };

  return (
    <div className="bg-yellow-50 min-h-screen">
      <Navbar />
      <Container size="sm" className="py-10">
        <h1 className="text-2xl font-bold text-center mb-8">
          Cadastro de Usuário
        </h1>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Nome"
              placeholder="Seu nome"
              {...form.getInputProps("name")}
              required
            />
            <TextInput
              label="Email"
              placeholder="seu.email@exemplo.com"
              {...form.getInputProps("email")}
              required
              mt="md"
            />
            <TextInput
              label="Telefone"
              placeholder="(XX) XXXXX-XXXX"
              {...form.getInputProps("phone")}
              required
              mt="md"
            />
            <TextInput
              label="Endereço"
              placeholder="Seu endereço"
              {...form.getInputProps("address")}
              required
              mt="md"
            />
            <Button type="submit" fullWidth mt="xl">
              Cadastrar
            </Button>
          </form>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
}