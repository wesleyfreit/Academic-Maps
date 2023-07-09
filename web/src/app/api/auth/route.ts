import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  const redirectTo = req.cookies.get('redirectTo')?.value;

  const redirectURL = redirectTo ?? new URL('/', req.url);

  const cookieExpiresInSeconds = 3600;

  console.log(redirectURL);

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds};`,
    },
  });
}
