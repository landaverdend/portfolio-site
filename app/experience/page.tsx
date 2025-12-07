'use client';

import TechCarousel from '@/components/ui/tech-carousel';
import { Timeline, TimelineItem, TimelineHeader, TimelineSeparator, TimelineIcon, TimelineBody } from '@/components/ui/timeline';
import { Badge, Briefcase, GraduationCap } from 'lucide-react';

export default function Experience() {
  const paragraphStyle = 'text-muted-foreground mt-3 text-sm';

  return (
    <div className="w-full flex flex-col items-center justify-center pt-10 gap-8 pb-15 lg:pb-0 ">
      <h1 className="text-2xl font-bold">Experience</h1>
      <div className=" flex items-center justify-center ">
        <Timeline color="primary" orientation="vertical" className="w-4/5">
          <TimelineItem>
            <TimelineHeader>
              <TimelineSeparator />
              <TimelineIcon>
                <Briefcase className="h-4 w-4" />
              </TimelineIcon>
            </TimelineHeader>
            <TimelineBody className="-translate-y-1.5">
              <ExperienceItem title="Full Stack Developer at Clearwave Corporation" date="March 2022">
                <p className={paragraphStyle}>
                  Successfully established the new office location with all necessary equipment and infrastructure in place. The
                  team is ready to begin operations.
                </p>
              </ExperienceItem>
            </TimelineBody>
          </TimelineItem>

          <TimelineItem>
            <TimelineHeader>
              <TimelineSeparator />
              <TimelineIcon>
                <Briefcase className="h-4 w-4" />
              </TimelineIcon>
            </TimelineHeader>
            <TimelineBody className="-translate-y-1.5">
              <ExperienceItem title="Full Stack Developer at ECS Federal" date="March 2022">
                <p className={paragraphStyle}>
                  Successfully established the new office location with all necessary equipment and infrastructure in place. The
                  team is ready to begin operations.
                </p>
              </ExperienceItem>
            </TimelineBody>
          </TimelineItem>

          <TimelineItem>
            <TimelineHeader>
              <TimelineSeparator />
              <TimelineIcon>
                <Briefcase className="h-4 w-4" />
              </TimelineIcon>
            </TimelineHeader>
            <TimelineBody className="-translate-y-1.5">
              <ExperienceItem
                title="Associate Backend Developer at Lowe's Home Improvement"
                date="May 2021"
                techStack={['Java', 'Couchbase', 'Spring Boot', 'Kafka']}>
                <p className={paragraphStyle}>
                  Developed and maintained asynchronous microservices and Couchbase databases to manage product catalog updates,
                  tracking, and changes.{' '}
                </p>
                <br />
                <p className={paragraphStyle}>
                  Built backend APIs that served real-time pricing data to millions of users on lowes.com and the mobile app.
                  Generated price reports and analytics dashboards for marketing teams to support strategic decision-making.
                </p>
              </ExperienceItem>
            </TimelineBody>
          </TimelineItem>

          <TimelineItem>
            <TimelineHeader>
              <TimelineIcon>
                <GraduationCap className="h-4 w-4" />
              </TimelineIcon>
            </TimelineHeader>
            <TimelineBody className="-translate-y-1.5">
              <ExperienceItem title="Graduated from Appalachian State University" date="May 2021">
                <p className={paragraphStyle}>
                  Graduated from Appalachian State University with a Bachelor of Science in Computer Science.
                </p>
                <p className="text-muted-foreground mt-3 text-sm">GPA: 3.8</p>
              </ExperienceItem>
            </TimelineBody>
          </TimelineItem>
        </Timeline>
      </div>
    </div>
  );
}

type ExperienceItemProps = {
  title: string;
  date: string;
  children: React.ReactNode;

  techStack?: string[];
};
function ExperienceItem({ title, date, children }: ExperienceItemProps) {
  return (
    <div className="flex flex-col items-start justify-center ">
      <h3 className="text-base leading-none font-semibold">{title}</h3>
      <p className="text-muted-foreground text-xs">{date}</p>
      {children}
      <TechCarousel />
    </div>
  );
}
