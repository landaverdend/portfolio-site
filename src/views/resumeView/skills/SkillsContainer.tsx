import SubHeader from '@/components/subHeader/SubHeader';
import './skills-container.css';
import reactlogo from '@assets/images/skills/react.svg';
import angular from '@assets/images/skills/angular.svg';

type SWProps = {
  techSkill: TechSkill;
};
function SkillWidget({ techSkill }: SWProps) {
  const { skill, proficiency, logo } = techSkill;

  return (
    <div className="skill-widget flex-column">
      <div className="tech-label flex-row">
        <span className="flex-row" style={{ justifyContent: 'flex-start', gap: '10px' }}>
          <h3>{skill}</h3>
          {logo ? <img src={logo} /> : <></>}
        </span>

        <span className="proficiency">{proficiency}%</span>
      </div>
      <progress value={proficiency} max={100}></progress>
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
      <span className="label">{label}</span>
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
  { skill: 'React', proficiency: 84, logo: reactlogo },
  { skill: 'Angular', proficiency: 62, logo: angular },
  { skill: 'CSS', proficiency: 85, logo: '' },
  { skill: 'NodeJS', proficiency: 60, logo: '' },
  { skill: 'Typescript', proficiency: 89, logo: '' },
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
