import './load-spinner.css';

type LSProps = {
  color?: string;
};
export default function LoadSpinner({ color }: LSProps) {
  const colorToUse = color ? color : '#1a73e8';

  return <span className="load-spinner" style={{ borderTopColor: colorToUse, borderRightColor: colorToUse }}></span>;
}
