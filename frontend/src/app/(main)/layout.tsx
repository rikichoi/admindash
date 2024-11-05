import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <Navbar />
        <AppSidebar />
        <main className="w-full min-h-screen font-rubik bg-[#f7fcec]">
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
