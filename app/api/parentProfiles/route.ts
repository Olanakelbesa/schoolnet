import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(request: Request) {
  try {
    const token = await getToken({ req: request as any });
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch('https://schoolnet-be.onrender.com/api/v1/parentProfiles', {
      headers: {
        'Authorization': `Bearer ${token.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('GET parentProfiles response:', data);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in parentProfiles API route:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const token = await getToken({ req: request as any });
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    console.log('POST parentProfiles request body:', JSON.stringify(body, null, 2));

    // Validate required fields
    const requiredFields = [
      'numberOfChildren',
      'childrenDetails',
      'address',
      'preferredLocations'
    ];

    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate childrenDetails
    if (!body.childrenDetails.gradeLevels?.length || !body.childrenDetails.schoolType?.length) {
      console.error('Invalid childrenDetails:', body.childrenDetails);
      return NextResponse.json(
        { error: 'Children details must include gradeLevels and schoolType arrays' },
        { status: 400 }
      );
    }

    // Validate address
    if (!body.address.city || !body.address.subCity) {
      console.error('Invalid address:', body.address);
      return NextResponse.json(
        { error: 'Address must include city and subCity' },
        { status: 400 }
      );
    }

    const response = await fetch('https://schoolnet-be.onrender.com/api/v1/parentProfiles', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const responseData = await response.json();
    console.log('POST parentProfiles response:', JSON.stringify(responseData, null, 2));

    if (!response.ok) {
      throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
    }

    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error('Error in parentProfiles API route:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
} 