"use client";
import { Header } from "./_components/header";
import { Body } from "./_components/body";
import { Form } from "./_components/form";

export default function Chat() {
    return (
     <div className="bg-neutral-800 w-full h-full flex flex-col">
            <Header />
            <div className="flex flex-col h-full w-full">
                <Body/>
                <div className="w-full fixed bottom-0">
                <Form />
                    <p className="w-full text-center text-xs text-neutral-400 my-2 lg:pr-[300px]">TalkGPT could make errors. Consider checking important information.</p>
                </div>
            </div>
        </div>
    );
};