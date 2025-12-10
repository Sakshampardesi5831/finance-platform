import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetCategories = () => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await client.api.categories.$get();
      if (!response.ok) {
        throw new Error("failed to fetch categories");
      }
      const { result } = await response.json();
      return result;
    },
  });
  return query;
};