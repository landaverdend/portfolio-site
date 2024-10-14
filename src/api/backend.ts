export async function callBackend(): Promise<string> {
  return new Promise((resolve) => {
    
    const delay = Math.random() * 4000 + 2000; // Random delay between 1s and 3s
    setTimeout(() => {
      resolve('its so over...hahahahah');
    }, delay);
  
  });
}
