"use client";
import { api } from "@/lib/hono-rpc";
import { useQuery } from "@tanstack/react-query";

const useGetDocumentById = (documentId: string) => {
  const query = useQuery({
    queryKey: ["document", documentId],
    queryFn: async () => {
      const response = await api.document[":documentId"].$get({
        param: { documentId: documentId },
      });

      if (!response.ok) {
        throw new Error("Failed to get document");
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

export default useGetDocumentById;
