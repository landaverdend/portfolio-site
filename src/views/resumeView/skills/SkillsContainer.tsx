import SubHeader from '@/components/subHeader/SubHeader';
import './skills-container.css';

type SWProps = {
  techSkill: TechSkill;
};
function SkillWidget({ techSkill }: SWProps) {
  const { skill, proficiency, logo } = techSkill;

  return (
    <div className="skill-widget flex-column">
      <h3>{skill}</h3>
      <progress className="proficiency-bar" value={proficiency} ></progress>
    </div>
  );
}

type TechSkill = {
  skill: string;
  proficiency: number;
  logo?: string;
};

const frontendSkills: Array<TechSkill> = [
  { skill: 'React', proficiency: 84, logo: '' },
  { skill: 'Angular', proficiency: 62, logo: '' },
  { skill: 'CSS', proficiency: 85, logo: '' },
  { skill: 'NodeJS', proficiency: 60, logo: '' },
  { skill: 'Typescript/Javascript', proficiency: 89, logo: '' },
  { skill: 'Esri API', proficiency: 56, logo: '' },
  { skill: 'Webpack', proficiency: 65, logo: '' },
];

export default function SkillsContainer() {
  // const items = [];

  // for (let i = 0; i < 16; i++) {
  //   items.push(
  //     <span className="flex-column" style={{ backgroundColor: 'red' }}>
  //       {i}
  //     </span>
  //   );
  // }

  return (
    <div className="skills-container">
      <SubHeader>
        <h1>Skills</h1>
      </SubHeader>

      <div className="skills-grid">
        {/* {items} */}
        {frontendSkills.map((skill) => (
          <SkillWidget techSkill={skill} />
        ))}
      </div>
    </div>
  );
}
