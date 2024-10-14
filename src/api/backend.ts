const baseUrl = 'http://localhost:8080';

export async function callChatEndpoint(clientMessage: string): Promise<string | null> {
  try {
    const response = await fetch(`${baseUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clientMessage: clientMessage }),
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
