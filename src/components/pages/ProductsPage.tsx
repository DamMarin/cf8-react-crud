import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {useEffect, useState} from "react";
import {deleteProduct, getProducts} from "@/services/api.products.ts";
import type {Product} from "@/schemas/products.ts";
import {Button} from "@/components/ui/button.tsx";
import {Pencil, Trash2} from "lucide-react";
import {useNavigate} from "react-router";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    deleteProduct(id);
  }

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      // .finally(() => setLoading(false));
    console.log(products);
  }, [])

  return(
    <>
      <div className="p-8">
        <h1 className="text-2xl text-center mb-6">Products</h1>
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    <Pencil className="w-4 h-4"/>
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="w-4 h-4"/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default ProductsPage;