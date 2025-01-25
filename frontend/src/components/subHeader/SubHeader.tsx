import './sub-header.css';

type SHProps = {
  children: React.ReactNode;
  barWidth?: string;
};
export default function SubHeader({ children, barWidth }: SHProps) {
  return (
    <div className="subheader-container flex-row">
      <div>
        <hr style={{ width: barWidth ? barWidth : '' }} />
      </div>

      {children}
      <div>
        <hr style={{ width: barWidth ? barWidth : '' }} />
      </div>
    </div>
  );
}
