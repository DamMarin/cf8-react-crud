import {Input} from "@/components/ui/input.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {productSchema} from "@/schemas/products.ts";
import {Textarea} from "@/components/ui/textarea.tsx";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const ProductPage = () => {

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      image: "",
      price: 0,
      sort: 0,
      is_active: false,
      is_favorite: false,
    }
  });

  return(
  <>
    <form>

      <Input {...register("name")}/>
      <Input {...register("slug")}/>
      <Textarea {...register("description")}/>
      <Input {...register("image")}/>
      <Input {...register("price")}/>
      <Input {...register("sort")}/>

      <div className="flex items-center space-x-2">
        <Switch
          checked={watch("is_active")}
          onCheckedChange={(value) => setValue("is_active", value)}
          id="is-active" />
        <Label htmlFor="is-active">Is Active</Label>
      </div>




    </form>

  </>
)
}

export default ProductPage;