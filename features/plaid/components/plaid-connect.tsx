"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useMount } from "react-use";
import { useCreateLinkToken } from "../api/use-create-link-token";
import { usePlaidLink } from "react-plaid-link";
import { useExchangePublicToken } from "../api/use-exchange-public-token";
type ResponseType = {
  data: string;
};

const PlaidConnect = () => {
  const [token, setToken] = useState<string | null>(null);

  const createLinkToken = useCreateLinkToken();
  const exchangePublicToken = useExchangePublicToken();

  useMount(() => {
    // @ts-expect-error mutate expects no parameters but we need to pass undefined for POST request
    createLinkToken.mutate(undefined, {
      onSuccess: ({ data }: ResponseType) => {
        setToken(data);
      },
    });
  });

  const plaid = usePlaidLink({
    token: token,
    onSuccess: (public_token: string) => {
      const result = exchangePublicToken.mutate({
        publicToken: public_token,
      });
      console.log("access_token====>", result);
    },
    env: "sandbox",
  });

  const isDisabled = !plaid.ready || exchangePublicToken.isPending;

  const onClick = () => {
    if (plaid.ready) {
      plaid.open();
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={isDisabled}
      variant={"ghost"}
      size={"sm"}
    >
      Plaid Connect
    </Button>
  );
};

export default PlaidConnect;
