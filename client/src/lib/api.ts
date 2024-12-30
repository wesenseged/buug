import { hc } from "hono/client";
import type { AppType } from "@server/app";
import { queryOptions } from "@tanstack/react-query";

const client = hc<AppType>("/");

export const api = client.api;
const getUser = async () => {
  const res = await api.me.$get();
  const data = res.json();
  return data;
};

// Get user
export const userQueryOption = queryOptions({
  queryKey: ["get-profile"],
  staleTime: Infinity,
  queryFn: getUser,
});

// Get Tasks
export const taskQueryOption = queryOptions({
  queryKey: ["get-tasks"],
  queryFn: async () => {
    const res = await api.task.$get();
    const data = res.json();
    return data;
  },
});

// get Notes
export const noteQueryOption = queryOptions({
  queryKey: ["get-notes"],
  queryFn: async () => {
    const res = await api.note.$get();
    const data = await res.json();
    return data;
  },
});

// get Chart
export const chartQueryOption = queryOptions({
  queryKey: ["get-chart"],
  queryFn: async () => {
    const res = await api.chart.$get();
    const data = await res.json();
    return data;
  },
});

export const projectQueryOption = queryOptions({
  queryKey: ["get-project"],
  queryFn: async () => {
    const res = await api.project.$get();
    const data = await res.json();
    return data;
  },
});