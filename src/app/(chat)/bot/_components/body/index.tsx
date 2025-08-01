"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef} from "react";
import { MessageBox } from "./message-box";
import { Message } from "@/convex/types/message";

interface BodyProps {
    messages: Message[];
}

export const Body = ({ messages }: BodyProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
 
    useEffect(() => {
        scrollToBottom();
    }, [messages]) 

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" }); 
        }
    };

    return (
        <ScrollArea
            className="h-full w-full flex-1 my-4" 
        >
            <div className="w-full pb-4"> 
                {messages.map((message) => (
                    <MessageBox
                        key={message.id}
                        message={message}
                    />
                ))}
            </div>
            <div ref={scrollRef} />
        </ScrollArea>
    );
};