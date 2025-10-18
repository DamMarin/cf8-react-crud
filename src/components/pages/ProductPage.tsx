import {Input} from "@/components/ui/input.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type Product, productSchema} from "@/schemas/products.ts";
import {Textarea} from "@/components/ui/textarea.tsx";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {Button} from "@/components/ui/button.tsx";
import {useEffect} from "react";
import {createProduct, getProduct, updateProduct} from "@/services/api.products.ts";
import {useNavigate, useParams} from "react-router";
import { toast } from "sonner";

const ProductPage = () => {
  const { productId } = useParams();
  const isEdit = Boolean(productId);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema.omit({id: true})),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      image: "",
      price: 0,
      sort: 0,
      is_active: false,
      is_favorite: false,
      category_id: 1, // Default category ID
    }
  });

  useEffect(() => {
    if (!isEdit && !productId) return;
    getProduct(Number(productId))
      .then((data) => {
        const values = {
          name: data.name,
          slug: data.slug,
          description: data.description,
          image: data.image,
          price: data.price,
          sort: data.sort,
          is_active: data.is_active,
          is_favorite: data.is_favorite,
          category_id: 1,
        };
        reset(values);
      })
      .catch((err) => {
        console.log("Error getting product: ", err);
      })
  }, [isEdit, productId, reset])

  const onSubmit = async (data: Omit<Product, "id">) => {
    try {
      if (isEdit && productId) {
        await updateProduct(Number(productId), data);
        toast.success("Product updated successfully");
      } else {
        await createProduct(data);
        toast.success("Product created successfully");
      }
      navigate("/products");
    } catch (error) {
      // console.log("Error creating product: ", error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  }

  return(
  <>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto mt-12 p-8 border rounded-md space-y-4"
      autoComplete="off"
    >
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")}/>
        {errors.name  && (
        <div className="text-cf-dark-red text-sm">
          {errors.name.message}
        </div>
        )}
      </div>
      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" {...register("slug")}/>
        {errors.slug  && (
          <div className="text-cf-dark-red text-sm">
            {errors.slug.message}
          </div>
        )}
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")}/>
        {errors.description  && (
          <div className="text-cf-dark-red text-sm">
            {errors.description.message}
          </div>
        )}
      </div>
      <div>
        <Label htmlFor="image">Image</Label>
        <Input id="image" {...register("image")}/>
        {errors.image  && (
          <div className="text-cf-dark-red text-sm">
            {errors.image.message}
          </div>
        )}
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input id="price" {...register("price")}/>
        {errors.price  && (
          <div className="text-cf-dark-red text-sm">
            {errors.price.message}
          </div>
        )}
      </div>
      <div>
        <Label htmlFor="sort">Sort</Label>
        <Input id="sort" {...register("sort")}/>
        {errors.sort  && (
          <div className="text-cf-dark-red text-sm">
            {errors.sort.message}
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          checked={watch("is_active")}
          onCheckedChange={(value) => setValue("is_active", value)}
          id="is-active" />
        <Label htmlFor="is-active">Is Active</Label>
        {errors.is_active  && (
          <div className="text-cf-dark-red text-sm">
            {errors.is_active.message}
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          checked={watch("is_favorite")}
          onCheckedChange={(value) => setValue("is_favorite", value)}
          id="is-favorite" />
        <Label htmlFor="is-favorite">Is Favorite</Label>
        {errors.is_favorite  && (
          <div className="text-cf-dark-red text-sm">
            {errors.is_favorite.message}
          </div>
        )}
      </div>
      <Button disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  </>
)
}

export default ProductPage;