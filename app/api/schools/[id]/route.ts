import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = await getToken({ req: request as any });
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(`https://schoolnet-be.onrender.com/api/v1/schools/${params.id}`, {
      headers: {
        'Authorization': `Bearer ${token.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in school details API route:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
} 