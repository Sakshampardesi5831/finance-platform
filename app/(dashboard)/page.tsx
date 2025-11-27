"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
export default function Home() {
  const {onOpen, isOpen} = useNewAccount();
  console.log('Sheet isOpen:', isOpen);
  return <div>
    <Button onClick={()=>{
      console.log('Button clicked, calling onOpen');
      onOpen();
    }}>Add a Account</Button>
  </div>;
}
