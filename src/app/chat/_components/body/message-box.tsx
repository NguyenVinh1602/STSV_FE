import { Message } from "@/convex/types/message";

interface MessageBoxProps {
    message: Message ;
}

export const MessageBox = ({
    message,
}: MessageBoxProps) => {
    const nameString = message.role === "user" ? "You" : "TalkGPT";

    return (
        <div
            className="flex space-x-3 items-start mb-10 max-w-[calc(80%)] md:max-w-full text-wrap"
        >
            <div className="max-w-[calc(80%)]">
                <h3 className="font-bold">{nameString}</h3>
                <div className="flex flex-grow flex-col gap-3 gap-y-5">
                    {message.content}
                </div>
            </div>
        </div>
    )
}