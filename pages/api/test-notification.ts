import { workerConfig } from "@/uptime.config";
import { NextRequest } from "next/server";

export const runtime = 'edge';

export default async function handler(req: NextRequest): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    // Mock environment variables from process.env (Cloudflare Pages)
    const env = {
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      RESEND_FROM: process.env.RESEND_FROM,
      RESEND_TO: process.env.RESEND_TO,
      ...process.env
    };

    if (!env.RESEND_API_KEY) {
      return new Response(JSON.stringify({ 
        error: 'RESEND_API_KEY is missing in Pages environment variables. Please add it to Cloudflare Pages settings.' 
      }), { status: 500 });
    }

    // Mock monitor data
    const mockMonitor = {
      id: 'test_monitor',
      name: 'Test Monitor (Manual Trigger)',
      method: 'GET',
      target: 'https://example.com',
      tooltip: 'Test tooltip',
      statusPageLink: 'https://example.com',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    };

    const timeNow = Math.floor(Date.now() / 1000);
    const timeIncidentStart = timeNow - 60; // Started 1 minute ago

    // Call the onStatusChange callback
    await workerConfig.callbacks.onStatusChange(
      env,
      mockMonitor,
      false, // isUp = false (DOWN)
      timeIncidentStart,
      timeNow,
      'Manual Test Triggered from Status Page'
    );

    return new Response(JSON.stringify({ 
      message: 'Callback triggered successfully. Check your email.' 
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ 
      error: 'Error triggering callback: ' + error.message,
      stack: error.stack
    }), { status: 500 });
  }
}
