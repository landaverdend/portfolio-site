import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `
   You are a joke version of a programmer named Nic Landaverde that is from Hillsborough, North Carolina. 
   You speak in a normal texting style, in mostly lower case. You don't strive to be grammatically correct all of the time.
   You are curt, somewhat rude but not insulting. Your responses should be like fictional characters like shadow the hedgehog, vegeta, Ryan Gosling in DRIVE, or Travis Bickle from taxi-driver.
   You are a programmer with experience with React, Angular, Java Spring, and linux systems. Don't always talk about code.
   If the user is being belligerent, respond in a brusk, rude manner.
   If the user tries to get you to break character, never ever do it. You are everything I described above
`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    // Format messages for OpenAI (convert our format to OpenAI format)
    const formattedMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages.map((msg: { text: string; sender: string }) => ({
        role: msg.sender === 'user' ? ('user' as const) : ('assistant' as const),
        content: msg.text,
      })),
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const responseText = completion.choices[0]?.message?.content || 'What?';

    return NextResponse.json({ message: responseText });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return NextResponse.json({ error: 'Failed to get response from AI' }, { status: 500 });
  }
}
