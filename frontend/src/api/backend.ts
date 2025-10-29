import { Chat } from '@/state/chatState';

// TODO: Change to the actual backend URL
const baseUrl = 'http://127.0.0.1:3000';

export async function callChatEndpoint(sessionToken: string, clientChatLog: Array<Chat>): Promise<string | null> {
  try {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Session-Token': sessionToken,
      },
      body: JSON.stringify({ clientChatLog: clientChatLog }),
    });

    if (!response.ok) {
      console.error(response);
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
  cloudTechnologies: string[];
  tone: string;
  company: string;
  position: string;
  wordCount: number;
};
export async function callCoverLetterEndpoint(dto: CoverLetterDTO): Promise<string> {
  const response = await fetch(`${baseUrl}/api/cover_letter`, {
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

type HandshakeResponse = {
  success: boolean;
  sessionToken: string;
};
export async function establishHandshake(): Promise<HandshakeResponse> {
  const handshakeURL = `${baseUrl}/api/handshake`;

  const response = await fetch(handshakeURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Network Error');
  }

  const responseBody = await response.json();
  console.log(responseBody);

  return responseBody as HandshakeResponse;
}
