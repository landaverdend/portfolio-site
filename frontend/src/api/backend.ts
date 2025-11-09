// TODO: Change to the actual backend URL
const baseUrl = '';

export async function callChatEndpoint(sessionToken: string, userMessage: string): Promise<string | null> {
  try {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Session-Token': sessionToken,
      },
      body: JSON.stringify({ userMessage }),
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
export async function callCoverLetterEndpoint(sessionToken: string, dto: CoverLetterDTO): Promise<string> {
  const response = await fetch(`${baseUrl}/api/cover_letter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Session-Token': sessionToken,
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

  return responseBody as HandshakeResponse;
}
