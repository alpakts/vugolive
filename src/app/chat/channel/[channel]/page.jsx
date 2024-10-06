'use client';

import Call from "@/components/chat/video-call";
import { useEffect } from "react";

export default function Page(params) {
    useEffect(()=>
    {
            document.body.style.overflow = 'hidden';
    },[])
    return (
        <main className="flex w-screen flex-col h-screen overflow-auto fixed z-[999] bg-black top-0 left-0">
            <Call appId={process.env.NEXT_PUBLIC_AGORA_APP_ID ?? '4cc7a85443014303bb31372a087ec038'} channelName={params.params.channel}></Call>
        </main>
    )
}