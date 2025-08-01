import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { menuUserItems } from "./user-menu-item";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";

export default function UserDropdownMenu() {
  const userEmail = "ckube2033@gmail.com";
  const userAvatarSrc = "https://github.com/shadcn.png";
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  toast.success("Đã đăng xuất thành công!");
};

  return (
    <div className="flex items-center space-x-2">
      {/* Trigger cho DropdownMenu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>

          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={userAvatarSrc} alt="User Avatar" />
              <AvatarFallback>CN</AvatarFallback> {/* Chữ viết tắt nếu ảnh không tải được */}
            </Avatar>
          </Button>

        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-64 bg-gray-800 text-white border-gray-700" align="end" forceMount>

          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{userEmail}</p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-gray-700" />

          {/* Các mục menu */}
          {menuUserItems.map((item, index) => {
            if (item.type === 'item') {
              const Icon = item.icon; 
              return (
                <DropdownMenuItem key={index} className="cursor-pointer hover:bg-gray-700">
                  <Icon className="mr-2 h-4 w-4" /> 
                  <Link href={item.href} className="flex-grow">
                    {item.text}
                  </Link>
                </DropdownMenuItem>
              );
            } else if (item.type === 'separator') {
              return <DropdownMenuSeparator key={index} className="bg-gray-700" />;
            }
            return null;
          })}

          <DropdownMenuSeparator className="bg-gray-700" />

          <DropdownMenuItem className="cursor-pointer text-red-400 hover:bg-gray-700 focus:bg-gray-700" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}