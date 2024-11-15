import { Button, Input, Textarea } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { Product } from "../../../Types/types";

type FormProductProps = {
  product: Product;
  onSave: (updatedProduct: Product) => void;
}

const FormProduct: React.FC<FormProductProps> = ({ product, onSave }) => {
  const [formData, setFormData] = useState<Product>(product);

  useEffect(() => {
    setFormData(product);
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <Input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
};

export default FormProduct;
