'use client';

import Call from "@/components/chat/video-call";

export default function Page(params) {
    return (
        <main className="flex w-full flex-col">
            <Call appId={process.env.NEXT_PUBLIC_AGORA_APP_ID ?? '4cc7a85443014303bb31372a087ec038'} channelName={params.params.channel}></Call>
        </main>
    )
}