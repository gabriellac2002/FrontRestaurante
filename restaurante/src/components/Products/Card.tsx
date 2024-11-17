import { Badge, Button, Image, Text } from "@mantine/core";
import { Product } from "../../../Types/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="max-w-sm rounded-lg shadow-md bg-white border border-gray-200 overflow-hidden">
      <div className="relative">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <Text className="font-semibold text-lg text-gray-900">
            {product.name}
          </Text>
          <Badge color="pink" className="text-sm px-3 py-1 rounded-full">
            {product.category}
          </Badge>
        </div>

        <Text className="text-sm text-gray-500 mb-4">
          {product.description || "Sem descrição disponível"}
        </Text>

        <Button
          color="blue"
          fullWidth
          className="mt-4 rounded-lg py-3"
          onClick={() => window.location.href = `/product/${product.id}`}
        >
          Ver detalhes
        </Button>
      </div>
    </div>
  );
}
