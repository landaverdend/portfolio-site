import { AngularSVG, KafkaSVG, PostgreSQLSVG, ReactSVG, SpringSVG, TypescriptSVG } from '../tech-svgs';

type TechCarouselProps = {
  items: React.ReactNode[];
  columnCount?: number;
};
export default function TechCarousel({}) {
  const items = [
    <ReactSVG className="fill-white w-10 h-10" />,
    // <SpringSVG className="fill-white w-8 h-8" />,
    // <TypescriptSVG className="w-8 h-8" />,
    <KafkaSVG className="fill-white text-white w-12 h-12" />,
    <AngularSVG className="fill-white w-9 h-9 text-white" />,
    <PostgreSQLSVG className="fill-white w-9 h-9 " />,
  ];

  return (
    <div className="w-[325px] overflow-hidden mask-[linear-gradient(90deg,transparent_0%,#000_10%,#000_90%,transparent_100%)]">
      <div className="flex animate-dock-slide" style={{ width: '200%' }}>
        <div className="col-span-2 flex flex-row items-center gap-4" style={{ width: '50%', flexShrink: 0 }}>
          {items.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
          <span className="w-3"></span>
        </div>
        <div className="col-span-2 flex flex-row items-center gap-4" style={{ width: '50%', flexShrink: 0 }}>
          {items.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
