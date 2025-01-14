import SubHeader from '@/components/subHeader/SubHeader';
import './skills-container.css';

type SWProps = {
  skill: string;
  proficiency: number;
  logo: string;
};
function SkillWidget(props: SWProps) {
  return <div></div>;
}

export default function SkillsContainer() {
  const items = [];

  for (let i = 0; i < 16; i++) {
    items.push(
      <span className="flex-column" style={{ backgroundColor: 'red' }}>
        {i}
      </span>
    );
  }

  return (
    <div className="skills-container">
      <SubHeader>
        <h1>Skills</h1>
      </SubHeader>
      
      <div className="skills-grid">{items}</div>
    </div>
  );
}
