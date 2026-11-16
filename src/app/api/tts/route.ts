import { NextRequest, NextResponse } from 'next/server';
import { consumeQuota } from '@/lib/server/quota';

const MAX_TTS_CHARS = 400;

/**
 * Server-Side Neural TTS API Route
 * Supports Edge Neural TTS / OpenAI / ElevenLabs with crystal-clear human-like emotional speech
 */

export async function POST(req: NextRequest) {
  try {
    const { text, voice = 'en-US-JennyNeural', speed = 1.0 } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Long texts and requests without a premium key go to the free browser voice.
    if (text.length > MAX_TTS_CHARS || (!process.env.OPENAI_API_KEY && !process.env.ELEVENLABS_API_KEY)) {
      return NextResponse.json({ fallback: true });
    }

    // Premium voices cost money: signed-in users only, within their daily quota.
    const quota = await consumeQuota('tts');
    if (!quota.ok) {
      return NextResponse.json({ fallback: true, limited: quota.reason, notice: quota.message });
    }

    // Check for OpenAI API Key in env if available
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (openaiApiKey) {
      try {
        const response = await fetch('https://api.openai.com/v1/audio/speech', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'tts-1',
            input: text.trim(),
            voice: voice === 'male' ? 'onyx' : 'nova', // Nova is warm and expressive female, Onyx is deep warm male
            speed: Math.max(0.75, Math.min(1.25, speed)),
          }),
        });

        if (response.ok) {
          const audioBuffer = await response.arrayBuffer();
          return new NextResponse(audioBuffer, {
            status: 200,
            headers: {
              'Content-Type': 'audio/mpeg',
              'Cache-Control': 'public, max-age=31536000, immutable',
            },
          });
        }
      } catch (e) {
        console.warn('OpenAI TTS error, falling back to Edge TTS:', e);
      }
    }

    // Check for ElevenLabs API Key in env if available
    const elevenApiKey = process.env.ELEVENLABS_API_KEY;
    if (elevenApiKey) {
      try {
        // Rachel (21m00Tcm4TlvDq8ikWAM) or Adam (pNInz6obpgDQGcFmaJgB)
        const voiceId = voice === 'male' ? 'pNInz6obpgDQGcFmaJgB' : '21m00Tcm4TlvDq8ikWAM';
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
          method: 'POST',
          headers: {
            'xi-api-key': elevenApiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text.trim(),
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.8,
              style: 0.4,
              use_speaker_boost: true,
            },
          }),
        });

        if (!response.ok) {
          console.warn(`ElevenLabs TTS error ${response.status}:`, (await response.text()).slice(0, 300));
        } else {
          const audioBuffer = await response.arrayBuffer();
          return new NextResponse(audioBuffer, {
            status: 200,
            headers: {
              'Content-Type': 'audio/mpeg',
              'Cache-Control': 'public, max-age=31536000, immutable',
            },
          });
        }
      } catch (e) {
        console.warn('ElevenLabs TTS error:', e);
      }
    }

    // Return fallback guidance
    return NextResponse.json({
      fallback: true,
      message: 'No external cloud key configured. Client will use high-definition client-side engine with local fallback.',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
