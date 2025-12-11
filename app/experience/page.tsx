'use client';

import {
  React,
  Spring,
  Aws,
  Typescript,
  Kafka,
  Angular,
  PostgreSQL,
  Couchbase,
  Mongo,
  Java,
  Redis,
  RabbitMQ,
} from '@/components/tech-svgs';
import TechCarousel from '@/components/ui/tech-carousel';
import { Timeline, TimelineItem, TimelineHeader, TimelineSeparator, TimelineIcon, TimelineBody } from '@/components/ui/timeline';
import { Briefcase, GraduationCap } from 'lucide-react';

export default function Experience() {
  const paragraphStyle = 'text-muted-foreground mt-3 text-md text-white';

  return (
    <div className="w-screen flex flex-col items-center justify-center pt-10 pb-15 lg:pb-0">
      <div className="self-center flex flex-col items-center gap-[32px] lg:w-3/5">
        <h1 className="text-4xl font-bold animate-gradient">Experience</h1>

        <div className="flex items-center justify-center ">
          <Timeline color="primary" orientation="vertical" className="w-4/5">
            <TimelineItem>
              <TimelineHeader>
                <TimelineSeparator />
                <TimelineIcon>
                  <Briefcase className="h-4 w-4" />
                </TimelineIcon>
              </TimelineHeader>
              <TimelineBody className="-translate-y-1.5">
                <ExperienceItem
                  title="Full Stack Developer at Clearwave Corporation"
                  date="March 2022"
                  techLogos={[React, Java, Spring, PostgreSQL, Mongo, RabbitMQ]}>
                  <p className={paragraphStyle}>
                    Current position working as a Full Stack Developer on a variety of projects within the Healthcare Industry for
                    Clearwave Corporation.
                  </p>
                  <h3 className="text-base leading-none font-semibold">Projects</h3>
                  <ul className="list-disc list-inside text-sm">
                    <li>
                      <b>System Wide Audit Tool:</b> Built a set of microservices that consumed system events from RabbitMQ,
                      persisted them to MongoDB, and exposed a queryable API for a frontend application to retrieve audit events
                      for users
                    </li>
                    <li>
                      <b>Electronic Health Record (EHR) Cache:</b> Developed a custom caching solution to work around hard-set EHR
                      API rate limits by caching results and implementing a change listener to update cached data as changes
                      occur, preventing rate limit violations
                    </li>
                  </ul>
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
                    Worked on applications for the USPS that track carrier locations and packages nationwide.
                  </p>
                  <h3 className="text-base leading-none font-semibold">Projects</h3>
                  <ul className="list-disc list-inside text-sm">
                    <li>
                      <b>USPS Carrier Location Tracker:</b> Worked on a real-time tracking application that monitored carrier
                      locations nationwide using GPS-enabled tracking devices
                    </li>
                    <li>
                      <b>Package Success Dashboard:</b> Added a feature that overlaid National Weather Service (NWS) data onto
                      package delivery metrics, providing weather-specific context for success rate analytics
                    </li>
                  </ul>
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
                  <h3 className="text-base leading-none font-semibold">Projects</h3>
                  <ul className="list-disc list-inside text-sm">
                    <li>
                      Developed and maintained asynchronous microservices and Couchbase databases to manage product catalog
                      updates, tracking, and changes.
                    </li>
                    <li>
                      Built backend APIs that served real-time pricing data to tens of thousands of concurrent users on lowes.com
                      and the mobile app. Generated price reports and analytics dashboards for marketing teams to support
                      strategic decision-making.
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
