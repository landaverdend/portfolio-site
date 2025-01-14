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
      <progress className="proficiency-bar" value={proficiency} max={100}></progress>
    </div>
  );
}

type SGProps = {
  label: string;
  skills: Array<TechSkill>;
};
function SkillGrid({ label, skills }: SGProps) {
  return (
    <div className="sg-container flex-column">
      <h2>{label}</h2>
      <div className="skills-grid">
        {skills.map((skill) => (
          <SkillWidget techSkill={skill} />
        ))}
      </div>
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
  return (
    <div className="skills-container">
      <SubHeader>
        <h1>Skills</h1>
      </SubHeader>

      <SkillGrid label={'Frontend'} skills={frontendSkills} />
    </div>
  );
}
