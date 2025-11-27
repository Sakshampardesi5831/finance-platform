import { UserButton } from "@clerk/nextjs";
import HeaderLogo from "./HeaderLogo";
import Navigation from "./Navigation";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import WelcomeMessage from "./WelcomeMessage";
const Header = () => {
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between mb-14 ">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoading>
            <Loader2 className="text-slate-400 size-8 animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <UserButton afterSignOutUrl="/" />
          </ClerkLoaded>
        </div>
        <WelcomeMessage/>
      </div>
    </header>
  );
};

export default Header;
