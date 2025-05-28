import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, LogOut, LayoutGrid, Zap, Keyboard, HelpCircle, FileText, BookOpen } from "lucide-react";
import Link from "next/link";
import { toast } from 'sonner';

// Giả định có một hàm để xử lý đăng xuất
const handleLogout = () => {
  // Logic đăng xuất ở đây
  console.log("Người dùng đã đăng xuất");
  toast.success("Đã đăng xuất thành công!");
};


export default function UserDropdownMenu() {
  const userEmail = "ckube2033@gmail.com"; // Email người dùng
  const userAvatarSrc = "https://github.com/shadcn.png"; // URL ảnh đại diện (thay thế bằng ảnh thật)

  return (
    <div className="flex items-center space-x-2">
      {/* Trigger cho DropdownMenu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* Nút kích hoạt có thể là ảnh đại diện hoặc icon ba chấm */}
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={userAvatarSrc} alt="User Avatar" />
              <AvatarFallback>CN</AvatarFallback> {/* Chữ viết tắt nếu ảnh không tải được */}
            </Avatar>
          </Button>
          {/* Nếu bạn muốn dùng icon 3 chấm thay vì ảnh avatar, uncomment đoạn này: */}
          {/* <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <MoreVertical className="h-4 w-4" />
          </Button> */}
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-64 bg-gray-800 text-white border-gray-700" align="end" forceMount>
          {/* Địa chỉ email */}
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{userEmail}</p>
              {/* <p className="text-xs leading-none text-gray-400">
                your_plan_status
              </p> */}
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-gray-700" />

          {/* Các mục menu */}
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">
            <Zap className="mr-2 h-4 w-4" />
            <Link href="/upgrade-plan" className="flex-grow">
              Upgrade Plan
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">
            <LayoutGrid className="mr-2 h-4 w-4" />
            <Link href="/customize-chatgpt" className="flex-grow">
              Customize ChatGPT
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">
            <Settings className="mr-2 h-4 w-4" />
            <Link href="/settings" className="flex-grow">
              Settings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">
            <Keyboard className="mr-2 h-4 w-4" />
            <Link href="/keyboard-shortcuts" className="flex-grow">
              Keyboard shortcuts
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-gray-700" />

          <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">
            <HelpCircle className="mr-2 h-4 w-4" />
            <Link href="/help-faq" className="flex-grow">
              Help & FAQ
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">
            <BookOpen className="mr-2 h-4 w-4" />
            <Link href="/release-notes" className="flex-grow">
              Release notes
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">
            <FileText className="mr-2 h-4 w-4" />
            <Link href="/terms-policies" className="flex-grow">
              Terms & policies
            </Link>
          </DropdownMenuItem>

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