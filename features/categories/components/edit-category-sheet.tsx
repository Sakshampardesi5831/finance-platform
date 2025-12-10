import { useOpenCategory } from "../hooks/use-open-category";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CategoryForm } from "./category-form";
import { insertCategoriesSchema } from "@/db/schema";
import { useGetCategory } from "../api/use-get-category";
import { useUpdateCategory } from "../api/use-update-category";
import { useDeleteCategory } from "../api/use-delete-category";
import z from "zod";
import { Loader2 } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { Fragment } from "react";
export const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory();
  console.log("EditCategorySheet isOpen:", isOpen);
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "you are about delete the category"
  );
  const categoryQuery = useGetCategory(id);
  const editMutation = useUpdateCategory({ id: id });
  const deleteMutation = useDeleteCategory({ id: id });
  const isPending = editMutation.isPending || deleteMutation.isPending;

  const formSchema = insertCategoriesSchema.pick({
    name: true,
  });
  const isLoading = categoryQuery.isLoading;
  type FormValues = z.input<typeof formSchema>;

  const onSubmit = (values: FormValues) => {
    if (!id) return;
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const confirmed = await confirm();
    if (confirmed) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = categoryQuery.data
    ? {
        name: categoryQuery.data.name,
      }
    : { name: "" };

  return (
    <Fragment>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <SheetContent className="space-y-2 p-6">
          <SheetHeader>
            <SheetTitle className="text-left">Edit Category</SheetTitle>
          </SheetHeader>
          <SheetDescription>Edit in your existing category</SheetDescription>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <CategoryForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};