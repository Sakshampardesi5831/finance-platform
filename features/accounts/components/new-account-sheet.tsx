import { useNewAccount } from "../hooks/use-new-account";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AccountForm } from "./account-form";
import { insertAccountSchema } from "@/db/schema";
import { useCreateAccount } from "@/features/accounts/api/use-create-accounts";
import z from "zod";
export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();
  console.log("NewAccountSheet isOpen:", isOpen);
  const mutation = useCreateAccount();
  const formSchema = insertAccountSchema.pick({
    name: true,
  });

  type FormValues = z.input<typeof formSchema>;

  const onSubmit = (values: FormValues) => {
    // Placeholder for submit logic
    console.log(values);
    mutation.mutate(values,{
      onSuccess:()=>{
        onClose();
      }
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="space-y-4 p-6">
        <SheetHeader>
          <SheetTitle className="text-center"> New Account</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          Create new account to track your transactions
        </SheetDescription>
        <AccountForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  );
};
