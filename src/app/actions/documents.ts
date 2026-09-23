'use server';

import { supabase } from '@/lib/supabase';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import * as jose from 'jose';

// Secret key for verifying JWTs (make sure it matches your proxy.ts logic)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key'
);

async function getAuthenticatedUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    return payload.id as string;
  } catch (err) {
    return null;
  }
}

export async function uploadDocument(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const folder = (formData.get('folder') as string) || 'general';

    if (!file || !title) {
      return { success: false, error: 'File and title are required' };
    }

    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return { success: false, error: 'Unauthorized' };
    }

    // Retrieve client profile ID from user ID
    const client = await prisma.clientProfile.findUnique({
      where: { userId }
    });

    if (!client) {
      return { success: false, error: 'Client profile not found' };
    }

    // Create a unique storage path for Supabase
    const fileExtension = file.name.split('.').pop();
    const timestamp = Date.now();
    const storagePath = `clients/${client.id}/${folder}/${timestamp}-${Math.random().toString(36).substring(7)}.${fileExtension}`;

    // Upload to Supabase Storage (Bucket name: 'documents')
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Supabase Upload Error:', uploadError);
      return { success: false, error: 'Failed to upload to cloud storage' };
    }

    // Generate the public URL (if the bucket is public) 
    // or you could use signed URLs for better security.
    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(storagePath);

    // Save metadata in PostgreSQL via Prisma
    const document = await prisma.document.create({
      data: {
        title,
        fileUrl: publicUrl,
        storagePath: storagePath,
        folder,
        clientId: client.id,
      }
    });

    return { success: true, document };
  } catch (error) {
    console.error('Upload action error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
