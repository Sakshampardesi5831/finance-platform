import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.plaid)["create-link-token"]["$post"]
>;
type RequestType = InferRequestType<typeof client.api.plaid>;

export const useCreateLinkToken = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const response = await client.api.plaid["create-link-token"].$post();
      return await response.json();
    },
    onSuccess: () => {

      toast.success("Link token created");
    },
    onError: () => {
      toast.error("failed to create link token");
    },
  });
  return mutation;
};
