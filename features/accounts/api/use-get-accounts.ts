import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetAccounts = () => {
  const query = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await client.api.accounts.$get();
      if (!response.ok) {
        throw new Error("failed to fetch accounts");
      }
      const { result } = await response.json();
      return result;
    },
  });
  return query;
};
