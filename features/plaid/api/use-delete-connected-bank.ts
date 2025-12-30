import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { useQueryClient } from "@tanstack/react-query";
type ResponseType = InferResponseType<
  (typeof client.api.plaid)["connected-bank"]["$delete"]
>;
type RequestType = InferRequestType<typeof client.api.plaid>;

export const useDeleteConnectedBank = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const response = await client.api.plaid["connected-bank"].$delete();
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Bank Disconnected successfully");
      queryClient.invalidateQueries({ queryKey: ["connected-bank"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error("failed to disconnect from bank");
    },
  });
  return mutation;
};
