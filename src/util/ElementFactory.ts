import { MOBILE_WIDTH } from '@/components/navbar/Navbar';
import { randomNumber } from './random';

export function createDebugCanvas(): HTMLElement {
  const divToInject = document.createElement('div');

  divToInject.style.top = '0';
  divToInject.style.left = '0';
  divToInject.style.position = 'absolute';
  divToInject.style.zIndex = '-900';
  return divToInject;
}

const inputPlaceholders: string[] = [
  'First Name',
  'Last Name',
  'Email Address',
  'Phone Number',
  'Street Address',
  'City',
  'State/Province',
  'Postal Code/ZIP',
  'Country',
  'Job Title',
  'Company Name',
  'Years of Experience',
  'LinkedIn Profile URL',
  'Portfolio Website URL',
  'Cover Letter (optional)',
  'Resume File (PDF, DOCX)',
  'Reference Name',
  'Reference Contact Information',
  'Additional Information (optional)',
];

const optionPlaceholders: string[] = [
  'Yes',
  'No',
  'Maybe',
  'Not Applicable',
  'Please dont contact me',
  'Please contact me',
  'Please contact me with marketing materials',
  "I don't wish to receive marketing materials",
  'I am >6 feet tall',
  'I am <6 feet tall (yikes)',
  'I am a short king',
  'Please send me marketing materials',
  'I am a United Statesian (ew)',
  'I am a veteran',
  'I was maybe a veteran',
  'I am not handicapped',
  'I am not handicapped but maybe I could be',
  'I am NOT hispanic',
  'I am not hispanic',
  'I am a smoker (cool)',
  'I smoke menthols',
  'I am a quarter cherokee',
  'I am an eighth cherokee',
  'My grandma once told me that we have a native american ancestor',
  'Technically I am castizo',
  'Tecnicamente soy creole',
  'I am single',
  'I am single and ready to mingle',
  'I am single and waiting for god to send me a partner',
  'I am married but sometimes I think of someone else',
  'I am married',
  'I am NOT married',
  'I am mestizo',
  'I am argentinean',
  'Yanqui soy',
  'Soy argentino y es complicado',
  'Soy argentino pero soy más europeo que latino',
  'I am argentinean but I am more european than hispanic actually',
  "I am a little hispanic but it's complicated",
  'Sometimes I feel hispanic',
  'Male',
  'Female',
  'I have felonies',
  'I have no felonies',
  'I have some felonies but they were an accident',
  'I have a felony but it was just that one time',
  '0-1 years of experience',
  '2-3 years of experience',
  '3-5 years of experience',
  '5-8 years of experience',
  '>69 years of experience',
  'I have 420 years of experience',
  'I have no prior experience',
  'unemployed (loser)',
  'I am employed',
  'Yo soy veterano',
  'No era veterano pero estaba pensando en sí',
  'Pasáme materiales de advertencía',
  'Hombre',
  'Mujer',
  'No tengo trabajo, ni estoy buscando',
  'Soy de recursos humanos y mi trabajo no importa nada',
  'He matado hombres pero lo siento',
  'Algunas veces tengo pensamientos gays',
  'Tengo esposo/a pero a veces pienso en alguien más',
  'You arent as funny as you think you are...',
];

export function createInputElement(): HTMLElement {
  const inputToAdd = document.createElement('input');

  inputToAdd.type = 'text';
  inputToAdd.placeholder = inputPlaceholders[randomNumber(0, inputPlaceholders.length)];
  inputToAdd.id = `${crypto.randomUUID()}`;
  inputToAdd.className = 'physics input-style';

  const x = getValidXPosition(inputToAdd);

  inputToAdd.style.position = 'absolute';
  inputToAdd.style.top = `0px`;

  inputToAdd.style.left = `${x}px`;
  return inputToAdd;
}

export function createSelectElement(): HTMLElement {
  const el = document.createElement('select');
  el.id = `${crypto.randomUUID()}`;

  el.className = 'physics input-style';

  const x = getValidXPosition(el);

  el.style.position = 'absolute';
  el.style.top = `0px`;
  el.style.left = `${x}px`;

  const numOptions = randomNumber(3, 5);
  for (let i = 0; i < numOptions; i++) {
    const option = document.createElement('option');
    option.value = `${i}`;
    option.textContent = optionPlaceholders[randomNumber(0, inputPlaceholders.length)];
    el.appendChild(option);
  }
  return el;
}

function getValidXPosition(el: HTMLElement): number {
  let x = randomNumber(window.innerWidth * 0.2, window.innerWidth * 0.7);

  if (window.innerWidth <= MOBILE_WIDTH) {
    x = 50;
  }

  return x;
}
