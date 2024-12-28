import { Chat } from '@/state/chatState';

const baseUrl = 'http://localhost:8080';

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
    console.error('Error:', error);
  }

  return null;
}

export type CoverLetterDTO = {
  frameworks: string[];
  personalityTraits: string[];
  cloudTechnologoies: string[];
  tone: string;
  company: string;
  name: string;
};
export async function callCoverLetterEndpoint(dto: CoverLetterDTO) {
  // TODO: make the call to the endpoint.
  console.log(dto);
}
