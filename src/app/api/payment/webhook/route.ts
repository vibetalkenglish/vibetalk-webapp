import { NextRequest, NextResponse } from 'next/server';

/**
 * Webhook endpoint for automatic payment notifications
 * Compatible with PayOS, Casso, SeAPay, and custom banking webhooks
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received Payment Webhook:', body);

    // Parse transaction content (e.g. "VIBETALK ORD_12345" or "VIBETALK 1234")
    const description = body?.description || body?.content || body?.addInfo || '';
    const amount = Number(body?.amount || body?.transferAmount || 0);

    return NextResponse.json({
      success: true,
      message: 'Webhook received successfully',
      description,
      amount
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
