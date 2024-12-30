// Tanstack router, query
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
// Ui components
import { Label } from "@/components/ui/label";
// api
import { api } from "@/lib/api";
// Error page
import { ErrorPage } from "@/lib/error";

export const Route = createFileRoute("/_authenticated/logout")({
  component: Logout,
});

function Logout() {
  const { data, error } = useQuery({
    queryKey: ["logout"],
    queryFn: async () => {
      const res = await api.logout.$get();
      const data = res.json();
      return data;
    },
  });

  if (error) return <ErrorPage />;

  if (data)
    return (
      <section>
        <h1>Logged out successfully</h1>
        <div>
          <div>
            <Label>Signin</Label>
            <a href="/signin"></a>
          </div>
          <div>
            <Label>Login</Label>
            <a href="/login"></a>
          </div>
        </div>
      </section>
    );
}
