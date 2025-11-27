import { useNewAccount } from "../hooks/use-new-account";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AccountForm } from "./account-form";

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();
  console.log("NewAccountSheet isOpen:", isOpen);
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle className="text-center"> New Account</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          Create new account to track your transactions
        </SheetDescription>
        <AccountForm onSubmit={() => {}} disabled={false} />
      </SheetContent>
    </Sheet>
  );
};
