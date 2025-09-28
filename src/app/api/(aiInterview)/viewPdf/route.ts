import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'PDF viewer endpoint' }, { status: 200 });
}