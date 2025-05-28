"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Archive, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

export default function MoreActionsDropdown() {
  const handleArchive = () => {
    console.log("Đã lưu trữ");
    toast.info("Chức năng lưu trữ đang được phát triển.");
    // Thêm logic lưu trữ thực tế
  };

  const handleDelete = () => {
    console.log("Đã xóa");
    toast.warning("Xóa thành công!", {
      description: "Mục đã được chuyển vào thùng rác."
    });
    // Thêm logic xóa thực tế
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <MoreVertical className="h-4 w-4 text-white/50 hover:text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-gray-800 text-white border-gray-700" align="end" forceMount>
        <DropdownMenuItem className="cursor-pointer hover:bg-gray-700" onClick={handleArchive}>
          <Archive className="mr-2 h-4 w-4" />
          Archive
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-red-500 hover:bg-gray-700 focus:bg-gray-700" onClick={handleDelete}>
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}