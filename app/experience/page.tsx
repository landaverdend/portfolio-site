'use client';

import {
  AngularSVG,
  AwsSvg,
  CouchbaseSVG,
  JavaSvg,
  KafkaSVG,
  PostgreSQLSVG,
  ReactSVG,
  RedisSVG,
  SpringSVG,
  TypescriptSVG,
} from '@/components/tech-svgs';
import TechCarousel from '@/components/ui/tech-carousel';
import { Timeline, TimelineItem, TimelineHeader, TimelineSeparator, TimelineIcon, TimelineBody } from '@/components/ui/timeline';
import { Briefcase, GraduationCap } from 'lucide-react';

export default function Experience() {
  const paragraphStyle = 'text-muted-foreground mt-3 text-sm text-white';

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
              <ExperienceItem
                title="Full Stack Developer at ECS Federal"
                date="March 2022"
                techLogos={[Angular, Aws, Typescript, Spring, Java]}>
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
                techLogos={[Spring, Kafka, Couchbase, Redis, Java]}>
                <p className={paragraphStyle}>
                  Worked on the pricing API for Lowe's.com and the mobile app, as well as price reports for marketing teams.
                </p>
                <ul className="list-disc list-inside text-sm">
                  <li>
                    Developed and maintained asynchronous microservices and Couchbase databases to manage product catalog updates,
                    tracking, and changes.
                  </li>
                  <li>
                    Built backend APIs that served real-time pricing data to tens of thousands of concurrent users on lowes.com
                    and the mobile app. Generated price reports and analytics dashboards for marketing teams to support strategic
                    decision-making.
                  </li>
                </ul>
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
                  Graduated from Appalachian State University with a Bachelor of Science in Computer Science.{' '}
                </p>
                <p className="mt-3 text-sm text-white">GPA: 3.8</p>
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

  techLogos?: React.ReactNode[];
};
function ExperienceItem({ title, date, children, techLogos }: ExperienceItemProps) {
  return (
    <div className="flex flex-col items-start justify-center gap-3">
      <h3 className="text-base leading-none font-semibold">{title}</h3>
      <p className="text-muted-foreground text-xs">{date}</p>
      {children}
      <TechCarousel items={techLogos ?? []} />
    </div>
  );
}

const React = <ReactSVG className="fill-white w-10 h-10" />;
const Spring = <SpringSVG className="fill-white w-8 h-8" />;
const Aws = <AwsSvg className="fill-white w-8 h-8" />;
const Typescript = <TypescriptSVG className="w-8 h-8" />;
const Kafka = <KafkaSVG className="fill-white text-white w-12 h-12" />;
const Angular = <AngularSVG className="fill-white w-9 h-9 text-white" />;
const PostgreSQL = <PostgreSQLSVG className="fill-white w-9 h-9 " />;
const Couchbase = <CouchbaseSVG className="fill-white w-8 h-8 " />;
const Redis = <RedisSVG className="fill-white text-white w-8 h-8 " />;
const Java = <JavaSvg className="fill-white w-8 h-8 " />;
