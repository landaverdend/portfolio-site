import { Chat } from '@/state/chatState';

const baseUrl = 'http://174.129.119.147:8080';

export async function callChatEndpoint(clientChatLog: Array<Chat>): Promise<string | null> {
  try {
    const response = await fetch(`${baseUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clientChatLog: clientChatLog }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.text();
  } catch (error) {
    console.error('Error: ', error);
  }

  return null;
}

export type CoverLetterDTO = {
  otherDetails: string;
  frameworks: string[];
  personalityTraits: string[];
  cloudTechnologies: string[];
  tone: string;
  company: string;
  position: string;
  wordCount: number;
};
export async function callCoverLetterEndpoint(dto: CoverLetterDTO): Promise<string> {
  
  const response = await fetch(`${baseUrl}/cover_letter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dto),
  });

  if (!response.ok) {
    throw new Error('Network response error');
  }

  return response.text();
}
