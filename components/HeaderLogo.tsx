import React from "react";
import Logo from "./Logo";
import Link from "next/link";

const HeaderLogo = () => {
  return (
    <div className="item-center hidden lg:flex gap-x-4">
      <Link href={"/"}>
        <Logo />
      </Link>
      <p className="font-semibold text-white text-2xl">Finance</p>
    </div>
  );
};

export default HeaderLogo;
