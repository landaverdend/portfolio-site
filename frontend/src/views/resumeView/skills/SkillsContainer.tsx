import SubHeader from '@/components/subHeader/SubHeader';
import './skills-container.css';

type SWProps = {
  techSkill: TechSkill;
};
function SkillWidget({ techSkill }: SWProps) {
  const { skill, proficiency, logo } = techSkill;

  return (
    <div className="skill-widget flex-column">
      <div className="tech-details flex-row">
        <span className="tech-label" style={{ justifyContent: 'flex-start', gap: '10px' }}>
          <h3>{skill}</h3>
          {logo ? (
            <img src={new URL(`/src/assets/images/skills/${logo}.svg`, import.meta.url).toString()} />
          ) : (
            <></>
          )}
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
          <SkillWidget key={crypto.randomUUID()} techSkill={skill} />
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
  { skill: 'React', proficiency: 84, logo: 'react' },
  { skill: 'Angular', proficiency: 62, logo: 'angular' },
  { skill: 'NodeJS', proficiency: 60, logo: 'node' },
  { skill: 'Typescript', proficiency: 89, logo: 'typescript' },
  { skill: 'Webpack', proficiency: 65, logo: 'webpack' },
  { skill: 'Javascript', proficiency: 85, logo: 'javascript' },
];

const backendSkills: Array<TechSkill> = [
  { skill: 'Java', proficiency: 85, logo: 'java' },
  { skill: 'Spring Boot', proficiency: 80, logo: 'spring' },
  { skill: 'AWS', proficiency: 70, logo: 'aws' },
  { skill: 'Docker', proficiency: 75, logo: 'docker' },
  { skill: 'Gradle', proficiency: 80, logo: 'gradle' },
  { skill: 'Maven', proficiency: 80, logo: 'maven' },
];

export default function SkillsContainer() {
  return (
    <div className="skills-container">
      <SubHeader>
        <h1>Skills</h1>
      </SubHeader>

      <SkillGrid label={'Frontend'} skills={frontendSkills} />
      <SkillGrid label={'Backend'} skills={backendSkills} />
    </div>
  );
}
