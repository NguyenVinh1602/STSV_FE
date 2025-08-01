import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SendHorizonal, Loader2 } from "lucide-react"; 

interface FormProps {
    onMessageSent: (content: string) => Promise<void> | void;
}

export const Form = ({ onMessageSent }: FormProps) => {
    const [message, setMessage] = useState<string>("");
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false); 

    useEffect(() => {
        if (message.trim() !== "") {
            setIsTyping(true);
        } else {
            setIsTyping(false);
        }
    }, [message]);

    const handleSendMessage = async () => { 
        if (message.trim() === "" || isLoading) return; 

        setIsLoading(true); 

        try {
           
            await onMessageSent(message);
            setMessage(""); 
        } catch (error) {
            console.error("Failed to send message:", error);
          
        } finally {
            setIsLoading(false); 
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }

    return (
        <div className="w-full bg-neutral-800 py-2 rounded-xl flex items-center pr-2"> 
            <Input
                placeholder="Message TalkGPT..."
                className="flex-grow border-[1px] border-neutral-500 ring-none rounded-xl bg-inherit text-neutral-200 placeholder:text-neutral-400 h-12 px-4 mr-2" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading} 
            />
            {isLoading ? ( 
                <Button
                    size="icon" 
                    className="h-10 w-10 rounded-full bg-gray-500 hover:bg-gray-600 text-white animate-spin" 
                    disabled 
                >
                    <Loader2 className="w-5 h-5" /> 
                </Button>
            ) : ( 
                <Button
                    size="icon"
                    className="h-10 w-10 rounded-full bg-gray-500 hover:bg-gray-600 text-white" 
                    onClick={handleSendMessage}
                    disabled={!isTyping} 
                >
                    <SendHorizonal className="w-5 h-5" />
                </Button>
            )}
        </div>
    );
};