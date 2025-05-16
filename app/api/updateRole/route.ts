import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function PATCH(request: Request) {
  try {
    const token = await getToken({ req: request as any });
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    console.log('PATCH updateRole request body:', body);

    if (!body.role) {
      return NextResponse.json(
        { error: 'Role is required' },
        { status: 400 }
      );
    }

    // Get the authorization header from the request
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization token provided' }, { status: 401 });
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/updateRole`, {
      method: 'PATCH',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // First check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Non-JSON response received:', await response.text());
      return NextResponse.json(
        { error: 'Invalid response from server' },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log('PATCH updateRole response:', data);

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || `HTTP error! status: ${response.status}` },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in updateRole API route:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
} 