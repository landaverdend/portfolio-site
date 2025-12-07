import { AngularSVG, KafkaSVG, PostgreSQLSVG, ReactSVG, SpringSVG, TypescriptSVG } from '../tech-svgs';

type TechCarouselProps = {
  items: React.ReactNode[];
  columnCount?: number;
};
export default function TechCarousel({}) {
  const items = [
    <ReactSVG className="fill-white w-10 h-10" />,
    <SpringSVG className="fill-white w-8 h-8" />,
    <TypescriptSVG className="w-8 h-8" />,
    <KafkaSVG className="fill-white text-white w-12 h-12" />,
    <AngularSVG className="fill-white w-9 h-9 text-white" />,
    <PostgreSQLSVG className="fill-white w-9 h-9 " />,
  ];

  const animationDrawer = 'col-span-2 flex flex-row items-center justify-center gap-4 animate-dock-slide';

  return (
    <div className="w-8/10 overflow-hidden sm:w-1/2">
      <div className={animationDrawer}>
        {items.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}
