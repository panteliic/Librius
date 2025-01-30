import logo from "../assets/logo.svg";
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
import signUpIlustration from "../assets/sign-up-ilustration.svg";

const formSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address.")
      .nonempty("Email is required."),
    firstName: z
      .string()
      .nonempty("First name is required.")
      .min(2, "First name must be at least 2 characters.")
      .max(50, "First name cannot exceed 50 characters."),
    lastName: z
      .string()
      .nonempty("Last name is required.")
      .min(2, "Last name must be at least 2 characters.")
      .max(50, "Last name cannot exceed 50 characters."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(
        /[@$!%*?&#]/,
        "Password must contain at least one special character."
      )
      .max(32, "Password cannot exceed 32 characters."),
    confirmPassword: z.string().nonempty("Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-1/2 p-1 sm:p-9 flex justify-center items-center">
        <div className="absolute left-0 top-9 flex items-center justify-between w-full px-9">
          <a href="/" className={`text-3xl text-primary font-bold`}>
            Librius.
          </a>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-full"
          >
            <div className="flex justify-between gap-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel className="text-xl">First name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Jhon"
                        {...field}
                        className="py-6 text-xl "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel className="text-xl">Last name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Doe"
                        {...field}
                        className="py-6 text-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      {...field}
                      className="py-6 text-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full p-6 text-lg">
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <div className="overflow-hidden w-0 h-0 flex justify-center items-center bg-primary text-primary-foreground md:w-1/2 md:h-screen">
        <img
          src={signUpIlustration}
          alt="Sign up ilustration "
          className="w-full h-3/4 lg:w-3/4"
        />
      </div>
    </div>
  );
}

export default Register;
