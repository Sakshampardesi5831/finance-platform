import { useNewCategory } from "../hooks/use-new-category";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CategoryForm } from "./category-form";
import { insertCategoriesSchema } from "@/db/schema";
import { useCreateCategories } from "@/features/categories/api/use-create-categories";
import z from "zod";
export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();
  console.log("NewCategorySheet isOpen:", isOpen);
  const mutation = useCreateCategories();
  const formSchema = insertCategoriesSchema.pick({
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
          <SheetTitle className="text-center"> New Category</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          Create new category to organize your transactions
        </SheetDescription>
        <CategoryForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  );
};