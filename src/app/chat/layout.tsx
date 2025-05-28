import "../globals.css";
import { SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import { AppSidebar } from "../../components/app-sidebar";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full text-white bg-neutral-900">
    <SidebarProvider>
      <AppSidebar/>
        <div className="bg-neutral-900"> 
        <SidebarTrigger/>
        </div>
        <div className="h-full w-full">
          {children}
        </div>
    </SidebarProvider>
      </div>
  );
}
