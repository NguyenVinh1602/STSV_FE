"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef} from "react";
import { MessageBox } from "./message-box";
import { messages } from "@/convex/data/messages";

// interface BodyProps {
//     chatId: Id<"chats">;
// }

export const Body = (
  // { chatId }: BodyProps
) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    // const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "auto" });
        }
    };

    return (
        <>
            <ScrollArea
                className="max-h-[calc(100%-150px)] h-full w-full flex-1"
            >
                <div className="px-4 sm:px-12 md:px-52 2xl:px-[430px] relative">
                    {messages.map((message) => (
                        <MessageBox
                            key={message.id}
                            message={message}
                        />
                    ))}
                </div>
                <div ref={scrollRef} />
            </ScrollArea>
        </>
    );
};