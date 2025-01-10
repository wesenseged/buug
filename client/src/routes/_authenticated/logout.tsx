// Tanstack router, query
import { createFileRoute,useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
// api
import { api } from "@/lib/api";
// Error page
import { ErrorPage } from "@/lib/error";

export const Route = createFileRoute("/_authenticated/logout")({
  component: Logout,
});

function Logout() {
  const navigate = useNavigate();
  const {data, error } = useQuery({
    queryKey: ["logout"],
    queryFn: async () => {
      const res = await api.logout.$get();
      const data = res.json();
      return data;
    }
  });

  useEffect(() => {
    if (data) {
      navigate({ to: "/login" });
    }
  }, [data, navigate]);

  if (error) return <ErrorPage />;

  return null; 
}
