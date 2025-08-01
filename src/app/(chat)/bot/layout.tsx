
import { SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import { BotSidebar } from "@/components/chat/bot/bot-sidebar";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full text-white bg-neutral-900">
    <SidebarProvider>
      <BotSidebar/>
        <div className="bg-neutral-800"> 
        <SidebarTrigger/>
        </div>
        <div className="h-full w-full">
          {children}
        </div>
    </SidebarProvider>
      </div>
  );
}
