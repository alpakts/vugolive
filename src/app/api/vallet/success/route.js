// app/api/payment/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
    return NextResponse.redirect('https://vugolive.com/vallet/success', { status: 302 });
}
