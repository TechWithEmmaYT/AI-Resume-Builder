"use client";
import { api } from "@/lib/hono-rpc";
import { useQuery } from "@tanstack/react-query";

const useGetDocuments = () => {
  const query = useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const response = await api.document.recent.$get();

      if (!response.ok) {
        throw new Error("Failed to get documents");
      }

      const { data, success } = await response.json();
      return {
        data,
        success,
      };
    },
  });

  return query;
};

export default useGetDocuments;
