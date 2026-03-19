import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (
        pathname: string,
        /* clientPayload */
      ) => {
        // Here you can check for user session if needed
        // For signup, we allow public uploads
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime'],
          tokenPayload: JSON.stringify({
            userId: 'signup-user',
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }: { blob: any, tokenPayload?: string | null }) => {
        console.log('Upload completed:', blob.url, tokenPayload);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }, // The client will receive this as an error
    );
  }
}
