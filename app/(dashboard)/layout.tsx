import Header from "@/components/Header";
import { Fragment } from "react";
type Props = {
  children: React.ReactNode;
};

const DashBoardLayout = ({ children }: Props) => {
  return (
    <Fragment>
      <Header/>
      <main className="px-3 lg:px-4">{children}</main>
    </Fragment>
  );
};

export default DashBoardLayout;
