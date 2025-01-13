import './sub-header.css';

type SHProps = {
  children: React.ReactNode;
};
export default function SubHeader({ children }: SHProps) {
  return (
    <div className="subheader-container flex-row">
      <div>
        <hr />
      </div>

      {children}
      <div>
        <hr />
      </div>
    </div>
  );
}
