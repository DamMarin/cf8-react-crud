import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {type LoginFields, loginSchema} from "@/schemas/login.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {login} from "@/services/api.login.ts";
import {toast} from "sonner";
import {useNavigate} from "react-router";

export default function LoginPage(){
 const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFields) => {
    try {

      await login(data.username, data.password); //

      toast.success("Login successful");
      navigate("/products");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Login failed"
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
        <Label htmlFor="username">Name</Label>
        <Input id="username" {...register("username")}/>
        {errors.username  && (
          <div className="text-cf-dark-red text-sm">
            {errors.username.message}
          </div>
        )}
      </div>
      <div>
        <Label htmlFor="password">Slug</Label>
        <Input type="password" id="password" {...register("password")}/>
        {errors.password  && (
          <div className="text-cf-dark-red text-sm">
            {errors.password.message}
          </div>
        )}
      </div>
      <Button disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  </>
)

}