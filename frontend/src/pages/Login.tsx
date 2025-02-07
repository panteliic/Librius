import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import signInIlustration from "../assets/sign-in-ilustration.svg";
import { useLoginMutation } from "../store/apiSlice"; 
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/userSlice";
import { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom"; 


const formSchema = z.object({
  email: z
    .string()
    .email("Invalid email address.")
    .nonempty("Email is required."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(32, "Password cannot exceed 32 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[@$!%*?&#]/,
      "Password must contain at least one special character."
    ),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await login(values).unwrap();
      dispatch(setUser(response?.user)); 
      form.reset(); 
      navigate("/"); 
    } catch (err) {
      console.error("Login failed", error);
    }
  }

  const user = useSelector((state: RootState) => state.user);
  console.log(user);

  return (
    <div className="flex">
      <div className="overflow-hidden w-0 h-0 flex justify-center items-center bg-primary text-primary-foreground md:w-1/2 md:h-screen">
        <img
          src={signInIlustration}
          alt="Sign in illustration"
          className="w-full h-3/4 lg:w-3/4"
        />
      </div>
      <div className="w-screen h-screen md:w-1/2 p-9 flex justify-center items-center relative">
        <div className="absolute top-9 flex items-center justify-between w-full px-9">
          <a href="/" className={`text-3xl text-primary font-bold`}>
            Librius.
          </a>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="jhon@doe.com"
                      {...field}
                      className="py-6 text-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      className="py-6 text-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <a href="/auth/reset-password" className="text-primary underline">
              Forgot your password?
            </a>
            <Button type="submit" className="w-full p-6 text-lg" disabled={isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </Button>
            {error && <div className="text-red-500">Login failed. Please try again.</div>}
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Login;
