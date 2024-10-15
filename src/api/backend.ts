import { Chat } from '@/state/chatState';

const baseUrl = 'http://localhost:8080';

export async function callChatEndpoint(clientChatLog: Array<Chat>): Promise<string | null> {
  try {
    console.log(clientChatLog);
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
