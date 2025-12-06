type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  alt?: boolean;
};

export default function Button({ children, onClick, alt }: ButtonProps) {
  if (alt) return <AltButton children={children} onClick={onClick} />;

  return (
    <button
      className="bg-indigo-900 rounded-lg px-4 py-2  border border-indigo-400 hover:bg-indigo-400/20 transition-colors duration-300 cursor-pointer"
      onClick={onClick}>
      {children}
    </button>
  );
}

function AltButton({ children, onClick }: ButtonProps) {
  return (
    <button
      className="rounded-lg px-4 py-2  border border-indigo-400 hover:bg-indigo-400/20 transition-colors duration-300 cursor-pointer"
      onClick={onClick}>
      {children}
    </button>
  );
}
