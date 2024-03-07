// "use client";
import { useRouter } from "next/navigation";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";
import getCurrentUser from "@/app/actions/getCurrentUser";

async function Sidebar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <DesktopSidebar user={currentUser!} />
      <MobileFooter />
      <main className="lg:pl-12 h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
