// app/api/feed/route.ts (App Router)
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const cookie = req.headers.get('cookie') || '';

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/feed`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookie, // ✅ Forward browser cookie
    },
  });

  const data = await response.json();
  
  return NextResponse.json(data);
}
