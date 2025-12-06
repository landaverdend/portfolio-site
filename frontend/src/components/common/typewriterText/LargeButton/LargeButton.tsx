type LBProps = {
  children: React.ReactNode;
  onClick: Function;
  type?: 'submit' | 'reset' | 'button'; // for inputs
  disabled?: boolean;
  fontSize?: string;
  backgroundColor?: string;
};
export default function LargeButton({ children, onClick, type, disabled, fontSize, backgroundColor }: LBProps) {
  return (
    <button
      style={{
        backgroundColor: backgroundColor ? backgroundColor : 'var(--main-indigo)',
        boxShadow: '5px 5px black',
      }}
      onClick={() => onClick()}
      className={`text-white w-fit px-4 py-2 rounded-md border border-black hover:opacity-50 cursor-pointer text-[${
        fontSize ? fontSize : 'lg'
      }] lg:text-lg 2xl:p-5`}
      type={type ? type : 'button'}
      disabled={disabled}>
      {children}
    </button>
  );
}
