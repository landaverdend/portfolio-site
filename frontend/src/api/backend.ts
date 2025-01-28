import { Chat } from '@/state/chatState';

const baseUrl = '';

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

export async function fetchAndDownloadFile(url: string, fileName: string): Promise<void> {
  try {
    // Fetch the file
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    // Convert the response to a Blob
    const blob = await response.blob();
    

    // Create a temporary <a> element to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName; // Set the desired file name
    document.body.appendChild(link); // Append the link to the DOM
    link.click(); // Trigger the download

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    console.log(`File downloaded successfully as ${fileName}`);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
}
