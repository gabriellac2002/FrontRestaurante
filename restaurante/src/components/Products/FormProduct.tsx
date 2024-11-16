import { Button, Input, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { Product } from "../../../Types/types";
import { IoSaveSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

type FormProductProps = {
  product?: Product;
  onSave: (updatedProduct: Product) => void;
  close: () => void;
};

const FormProduct: React.FC<FormProductProps> = ({
  product,
  onSave,
  close,
}) => {
  const form = useForm<Product>({
    initialValues: product || {
      id: "",
      name: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      createdAt: new Date().toISOString(),
    },

    validate: {
      name: (value) =>
        value.trim().length === 0 ? "O nome é obrigatório" : null,
      price: (value) => (value <= 0 ? "O preço deve ser maior que 0" : null),
    },
  });

  const handleSubmit = (values: Product) => {
    onSave(values);
  };

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nome do Produto:
          </label>
          <Input
            id="name"
            placeholder="Digite o nome do produto"
            {...form.getInputProps("name")}
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Preço:
          </label>
          <Input
            id="price"
            type="number"
            placeholder="Digite o preço do produto"
            {...form.getInputProps("price")}
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Descrição:
          </label>
          <Textarea
            id="description"
            placeholder="Digite uma breve descrição do produto"
            {...form.getInputProps("description")}
          />
        </div>

        <div className="w-full flex gap-2 items-end justify-end mt-auto">
          <Button
            type="submit"
            size="md"
            radius="md"
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            <IoSaveSharp className="mr-2" />
            Salvar
          </Button>
          <Button
            type="button"
            size="md"
            radius="md"
            className="bg-gray-500 hover:bg-gray-600 text-white"
            onClick={close}
          >
            <IoMdClose className="mr-2" />
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormProduct;
