// src/pages/api/transcript.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { retrieveConversationTranscript } from '@/services/liveperson.server';

type Data = {
  transcript?: any;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // We only allow POST requests to this endpoint
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { conversationId } = req.body;

  if (!conversationId) {
    return res.status(400).json({ error: 'Missing conversationId in request body.' });
  }

  // Securely get credentials from server-side environment variables
  const accountId = process.env.LP_ACCOUNT_ID;
  const authToken = process.env.LP_AUTH_TOKEN;

  if (!accountId || !authToken) {
    console.error("Missing LP_ACCOUNT_ID or LP_AUTH_TOKEN in environment variables.");
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    const transcriptData = await retrieveConversationTranscript(conversationId, accountId, authToken);
    res.status(200).json({ transcript: transcriptData });
  } catch (error: any) {
    console.error("API Route Error:", error);
    res.status(500).json({ error: error.message || 'Failed to retrieve transcript.' });
  }
}
