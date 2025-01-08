// Tanstack router, query, zod-form-adapter, form
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useForm } from "@tanstack/react-form";
// Ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// api
import { api } from "@/lib/api";
// signin schema for type safty
import {InsertUser,insertUserSchema } from "@/types/user";

export default function Signup() {
  const navigate = useNavigate();
  const signup = async (value: InsertUser) => {
    const res = await api.register.$post({ json: value ,credentials: 'include'});
    const data = await res.json();
    return data;
  };

  const mutation = useMutation({
    mutationFn: async (value: InsertUser) => {
      return signup(value);
    },
    onSuccess: () => {
      navigate({ to: "/login" });
    },
  });

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      username: "",
      email: "",
      password_hash: "",
    },
    onSubmit: async ({ value }) => {
      mutation.mutate({
        username: value.username,
        email: value.email,
        password_hash: value.password_hash,
      });
    },
  });

  return (
    <section className="flex pl-10 bg-black">
      <img
        src="2.jpg"
        alt=""
        className=" overflow-hidden object-center h-screen py-10 rounded-[100px]"
      />
      <div className="flex flex-col space-y-8 items-center mr-96 ml-20 bg-black justify-center">
        <div className="w-96 space-y-8">
          <h1 className="text-5xl text-left flex text-white items-start">
            Sign Up
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
              name="username"
              validatorAdapter={zodValidator()}
              validators={{
                onChange: insertUserSchema.shape.username,
              }}
              children={(field) => {
                return (
                  <div className="space-y-4">
                    <Label htmlFor={field.name}>Name</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="wesenseged"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className=" rounded-2xl py-6 border-zinc-700 w-96"
                    />
                    <>
                      {field.state.meta.isTouched &&
                      field.state.meta.errors.length ? (
                        <em>{field.state.meta.errors.join(", ")}</em>
                      ) : null}
                      {field.state.meta.isValidating ? "Validating..." : null}
                    </>
                  </div>
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="email"
              validatorAdapter={zodValidator()}
              validators={{
                onChange: insertUserSchema.shape.email,
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
                    <>
                      {field.state.meta.isTouched &&
                      field.state.meta.errors.length ? (
                        <em>{field.state.meta.errors.join(", ")}</em>
                      ) : null}
                      {field.state.meta.isValidating ? "Validating..." : null}
                    </>
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
                onChange: insertUserSchema.shape.password_hash,
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
                    <>
                      {field.state.meta.isTouched &&
                      field.state.meta.errors.length ? (
                        <em>{field.state.meta.errors.join(", ")}</em>
                      ) : null}
                      {field.state.meta.isValidating ? "Validating..." : null}
                    </>
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
                  {isSubmitting ? "..." : "Sign Up"}
                </Button>
              )}
            />
          </div>

          <div className="flex mt-5 flex-row items-center space-y-20 w-96 justify-between">
            <div className="flex items-center space-x-3">
              <div className="border-b w-40 border-b-zinc-700" />
              <p className="text-zinc-500">Or</p>
              <div className="border-b w-40 border-b-zinc-700" />
            </div>
          </div>
          <div className="flex items-center mt-5 mx-auto w-96">
            <p className="text-center items-center text-lg">
              Already have account?
            </p>
            <Link to="/login" className="text-blue-400 hover:scale-105 ml-2 ">
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/signin")({
  component: Signup,
});
