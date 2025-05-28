"use client";

import { useState, useEffect } from "react";

import { Header } from "./_components/header";
import { Body } from "./_components/body";
import { Form } from "./_components/form";

import { messages as initialMessages } from "@/convex/data/messages";

import { Message } from "@/convex/types/message";

export default function Chat() {
    const [currentMessages, setCurrentMessages] = useState<Message[]>(initialMessages);

    const [hasMessages, setHasMessages] = useState(initialMessages.length > 0);
    const [formVisible, setFormVisible] = useState(false);

    useEffect(() => {
        setHasMessages(currentMessages.length > 0);
    }, [currentMessages]);

    useEffect(() => {
        if (!hasMessages) {
            const timer = setTimeout(() => {
                setFormVisible(true);
            }, 100);
            return () => clearTimeout(timer);
        } else {
            setFormVisible(true);
        }
    }, [hasMessages]);

    const handleMessageSent = (newMessageContent: string) => {
        const newMessage: Message = {
            id: Date.now(),
            content: newMessageContent,
            role: "user", 
        };

        const responseMessage: Message = {
            id: Date.now() + 1,
            content: `Echo: ${newMessageContent}`,
            role: "you", 
        };

        setCurrentMessages(prevMessages => [...prevMessages, newMessage, responseMessage]);
    };

    const formAreaHeight = "112px";

    if (!hasMessages) {
        return (
            <div className="bg-neutral-800 w-full h-full flex flex-col">
                <Header />
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <h1 className="text-neutral-200 text-3xl font-semibold mb-8">What can I help with?</h1>
                    <div
                        className={`
                            w-full max-w-2xl px-4 py-2
                            transition-all duration-700 ease-out transform
                            ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1/2'}
                        `}
                    >
                        <Form onMessageSent={handleMessageSent} />
                        <p className="w-full text-center text-xs text-neutral-400 mt-1 mb-2">
                            TalkGPT could make errors. Consider checking important information.
                        </p>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="bg-neutral-800 w-full h-full flex flex-col">
                <Header />
                <div className="flex flex-row h-full w-full">
                    <div className="flex-1 flex flex-col relative h-full">
                        <div
                            className="flex-1 overflow-y-auto px-4 sm:px-12 md:px-24 lg:px-40 2xl:px-64"
                            style={{ paddingBottom: formAreaHeight }}
                        >
                            <div className="max-w-2xl mx-auto">
                                <Body messages={currentMessages} />
                            </div>
                        </div>

                        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 py-2">
                            <Form onMessageSent={handleMessageSent} />
                            <p className="w-full text-center text-xs text-neutral-400 mt-1 mb-2">
                                TalkGPT could make errors. Consider checking important information.
                            </p>
                        </div>
                    </div>
                    <div className="w-1/5 bg-neutral-800 flex flex-col">
                    </div>
                </div>
            </div>
        );
    }
}