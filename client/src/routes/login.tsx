// Tanstack router, query, zod-form-adapter, form
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useForm } from "@tanstack/react-form";
// Ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
// api
import { api } from "@/lib/api";
// login schema for type safty
import {  LoginUser,loginUserSchema } from "@/types/user";


export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate(); 

  const login = async (value: LoginUser) => {
    const res = await api.login.$post({ json: value,credentials: 'include' });
     await res.json();
    if (!res.ok) {
      toast({
        title: "Invalid Credential",
        variant: "destructive",
      });
      return res.json();
    }
    toast({
      title: "User Loggedin",
      description: "Friday, February 10, 2023 at 5:57 PM",
    });
      navigate({ to: "/_authenticated/" }); // Use navigate to redirect
  };

  const mutation = useMutation({
    mutationFn: async (value: LoginUser) => {
      return login(value);
    },
  });

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      email: "",
      password_hash: "",
    },
    onSubmit: async ({ value }) => {
      mutation.mutate({
        email: value.email,
        password_hash: value.password_hash,
      });
    },
  });

  return (
    <section className="flex pl-10 bg-black">
      <img
        src="3.jpg"
        alt=""
        className=" overflow-hidden object-center h-screen py-10 rounded-[100px]"
      />
      <div className="flex flex-col space-y-8 items-center mr-96 ml-20 bg-black justify-center">
        <div className="w-96 space-y-8">
          <h1 className="text-5xl text-left flex text-white items-start">
            Log in
          </h1>
          <p className="text-lg text-zinc-500">
            Sign up today for the best productive app
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div>
            <form.Field
              name="email"
              validatorAdapter={zodValidator()}
              validators={{
                onChange: loginUserSchema.shape.email,
              }}
              children={(field) => {
                return (
                  <div className="space-y-4">
                    <Label htmlFor={field.name}>Email</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="wesenseged@something.com"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className=" rounded-2xl py-6 border-zinc-700 w-96"
                    />
                    <h1>
                      {field.state.meta.isTouched &&
                      field.state.meta.errors.length ? (
                        <em>{field.state.meta.errors.join(", ")}</em>
                      ) : null}
                      {field.state.meta.isValidating ? "Validating..." : null}
                    </h1>
                  </div>
                );
              }}
            />
          </div>
          <div className="mt-5">
            <form.Field
              name="password_hash"
              validatorAdapter={zodValidator()}
              validators={{
                onChange: loginUserSchema.shape.password_hash,
              }}
              children={(field) => {
                return (
                  <div className="space-y-4">
                    <Label htmlFor={field.name}>Password</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      placeholder="*********************"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className=" rounded-2xl py-6 border-zinc-700 w-96"
                    />
                  </div>
                );
              }}
            />
          </div>
          <div className="mt-10">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  className="text-xl py-6 bg-black dark:bg-white hover:bg-zinc-300 hover:dark:bg-zinc-700 hover:dark:text-white w-96 rounded-3xl text-black"
                >
                  {isSubmitting ? "..." : "Log in"}
                </Button>
              )}
            />
          </div>

          <div className="flex flex-row items-center space-y-20 w-96 justify-between">
            <div className="flex items-center space-x-3">
              <div className="border-b w-40 border-b-zinc-700" />
              <p className="text-zinc-500">Or</p>
              <div className="border-b w-40 border-b-zinc-700" />
            </div>
          </div>
          <div className="items-center flex mt-5 space-x-2 text-lg">
            <p>create new account ? </p>
            <Link to="/signin" className="text-blue-400 hover:scale-105">
              sign in
            </Link>
          </div>
        </form>
      </div>
      <Toaster />
    </section>
  );
}

export const Route = createFileRoute("/login")({
  component: Login,
});
