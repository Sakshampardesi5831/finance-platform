import { useOpenAccount } from "@/features/accounts/hooks/use-open-accounts";

type Props = {
  account: string;
  accountId: string;
};

export const AccountColoumn = ({ account, accountId }: Props) => {
  const { onOpen: onOpenAccount } = useOpenAccount();

  const onClick = () => {
    onOpenAccount(accountId);
  };

  return (
    <div
      onClick={onClick}
      className="flex item-center cursor-pointer hover:underline"
    >
      {account}
    </div>
  );
};
