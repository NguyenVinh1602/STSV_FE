import { Input } from "@/components/ui/input";
import { useState } from "react";

interface FormProps {
    onMessageSent: (content: string) => void;
}

export const Form = ({ onMessageSent }: FormProps) => {
    const [message, setMessage] = useState<string>("");

    const handleSendMessage = () => {
        if (message.trim() === "") return;
        // console.log("message sent (mock):", message);

        // Gọi callback và truyền nội dung tin nhắn đi
        onMessageSent(message);
        setMessage("");
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }

    return (
        <div className="w-full bg-neutral-800 py-2 rounded-xl flex items-center">
            <Input
                placeholder="Message TalkGPT..."
                className="flex-grow border-[1px] border-neutral-500 ring-none rounded-xl bg-inherit text-neutral-200 placeholder:text-neutral-400 h-12 px-4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};