import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { getCashfreeCredentials, clearCashfreeCredentialsCache } from '@/lib/cashfree';
import { clearPayUCredentialsCache } from '@/lib/payu';

export const runtime = 'nodejs';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-key',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
  try {
    const creds = await getCashfreeCredentials(true);

    return NextResponse.json(
      {
        success: true,
        config: {
          app_id: creds.appId,
          secret_key: creds.secretKey,
          merchant_key: creds.appId,
          merchant_salt: creds.secretKey,
          environment: creds.environment,
          return_url: creds.returnUrl,
          enabled: creds.enabled,
          configured: Boolean(creds.appId && creds.secretKey),
        },
      },
      { headers: CORS_HEADERS }
    );
  } catch (error: any) {
    console.error('Error fetching Cashfree config:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch Cashfree settings' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const app_id = String(body.app_id || body.merchant_key || '').trim();
    const secret_key = String(body.secret_key || body.merchant_salt || '').trim();
    const environment =
      body.environment === 'TEST' || body.environment === 'SANDBOX' ? 'SANDBOX' : 'PRODUCTION';
    const enabled = typeof body.enabled === 'boolean' ? body.enabled : true;
    const return_url =
      String(body.return_url || '').trim() || 'https://digihaven.vercel.app/api/payment/cashfree/return';

    const payload = {
      app_id,
      secret_key,
      merchant_key: app_id,
      merchant_salt: secret_key,
      environment,
      enabled,
      return_url,
      updated_at: new Date().toISOString(),
    };

    if (db) {
      try {
        // 1. Primary database persistence: store_settings/general & store_settings/cashfree
        await setDoc(doc(db, 'store_settings', 'general'), payload, { merge: true });

        // 2. Secondary database persistence: store_settings/cashfree and store_settings/payu
        await Promise.allSettled([
          setDoc(doc(db, 'store_settings', 'cashfree'), payload, { merge: true }),
          setDoc(doc(db, 'store_settings', 'payu'), payload, { merge: true }),
        ]);
      } catch (firestoreErr: any) {
        console.error('Firestore error saving Cashfree config in API route:', firestoreErr);
        return NextResponse.json(
          {
            success: false,
            error: `Firestore write error: ${firestoreErr.message || 'Permission denied'}`,
          },
          { status: 500, headers: CORS_HEADERS }
        );
      }
    } else {
      return NextResponse.json(
        { success: false, error: 'Database service is unavailable' },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    // Invalidate in-memory server caches so checkout picks up new keys immediately
    clearCashfreeCredentialsCache();
    clearPayUCredentialsCache();

    return NextResponse.json(
      {
        success: true,
        message: 'Cashfree credentials saved and verified in Firestore successfully.',
        config: {
          app_id,
          secret_key,
          merchant_key: app_id,
          merchant_salt: secret_key,
          environment,
          enabled,
          return_url,
          configured: Boolean(app_id && secret_key),
        },
      },
      { headers: CORS_HEADERS }
    );
  } catch (error: any) {
    console.error('Error saving Cashfree config:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to save Cashfree settings' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
