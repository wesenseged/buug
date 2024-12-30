import { userQueryOption } from "@/lib/api";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

const Component = () => {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;
    try {
      const user = await queryClient.fetchQuery(userQueryOption);
      if (!user) {
        return { user: null };
      }
      return user;
    } catch (e) {
      return { message: e };
    }
  },
  component: Component,
});
