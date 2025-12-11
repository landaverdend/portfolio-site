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
  const paragraphStyle = 'text-white/80 mt-3 text-sm lg:text-base leading-relaxed';

  return (
    <div className="w-full flex flex-col items-center justify-center pt-10 pb-20 lg:pb-0 px-4">
      <div className="self-center flex flex-col items-center gap-6 lg:gap-8 w-full lg:w-4/5 max-w-4xl">
        <h1 className="text-4xl lg:text-5xl font-bold animate-slide-up-fade opacity-0" style={{ animationDelay: '0.1s' }}>
          Experience
        </h1>

        <div className="flex items-center justify-center w-full">
          <Timeline color="primary" orientation="vertical" className="w-full max-w-full">
            <TimelineItem className="animate-slide-up-fade opacity-0" style={{ animationDelay: '0.2s' }}>
              <TimelineHeader>
                <TimelineSeparator />
                <TimelineIcon>
                  <Briefcase className="h-4 w-4" />
                </TimelineIcon>
              </TimelineHeader>
              <TimelineBody className="-translate-y-1.5 min-w-0">
                <ExperienceItem
                  title="Full Stack Developer at Clearwave Corporation"
                  date="March 2022"
                  techLogos={[React, Java, Spring, PostgreSQL, Mongo, RabbitMQ]}>
                  <p className={paragraphStyle}>
                    Current position working as a Full Stack Developer on a variety of projects within the Healthcare Industry for
                    Clearwave Corporation.
                  </p>
                  <h3 className="text-base lg:text-lg leading-none font-semibold mt-4 mb-2 text-white">Projects</h3>
                  <ul className="list-none space-y-3 text-sm lg:text-base w-full">
                    <li className="flex gap-2">
                      <span className="text-indigo-400 mt-1.5 flex-shrink-0">•</span>
                      <span className="text-white/90 break-words">
                        <b className="text-white font-semibold">System Wide Audit Tool:</b> Built a set of microservices that
                        consumed system events from RabbitMQ, persisted them to MongoDB, and exposed a queryable API for a
                        frontend application to retrieve audit events for users
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-indigo-400 mt-1.5 flex-shrink-0">•</span>
                      <span className="text-white/90 break-words">
                        <b className="text-white font-semibold">Electronic Health Record (EHR) Cache:</b> Developed a custom
                        caching solution to work around hard-set EHR API rate limits by caching results and implementing a change
                        listener to update cached data as changes occur, preventing rate limit violations
                      </span>
                    </li>
                  </ul>
                </ExperienceItem>
              </TimelineBody>
            </TimelineItem>

            <TimelineItem className="animate-slide-up-fade opacity-0" style={{ animationDelay: '0.3s' }}>
              <TimelineHeader>
                <TimelineSeparator />
                <TimelineIcon>
                  <Briefcase className="h-4 w-4" />
                </TimelineIcon>
              </TimelineHeader>
              <TimelineBody className="-translate-y-1.5 min-w-0">
                <ExperienceItem
                  title="Full Stack Developer at ECS Federal"
                  date="March 2022"
                  techLogos={[Angular, Aws, Typescript, Spring, Java]}>
                  <p className={paragraphStyle}>
                    Worked on applications for the USPS that track carrier locations and packages nationwide.
                  </p>
                  <h3 className="text-base lg:text-lg leading-none font-semibold mt-4 mb-2 text-white">Projects</h3>
                  <ul className="list-none space-y-3 text-sm lg:text-base w-full">
                    <li className="flex gap-2">
                      <span className="text-indigo-400 mt-1.5 flex-shrink-0">•</span>
                      <span className="text-white/90 break-words">
                        <b className="text-white font-semibold">USPS Carrier Location Tracker:</b> Worked on a real-time tracking
                        application that monitored carrier locations nationwide using GPS-enabled tracking devices
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-indigo-400 mt-1.5 flex-shrink-0">•</span>
                      <span className="text-white/90 break-words">
                        <b className="text-white font-semibold">Package Success Dashboard:</b> Added a feature that overlaid
                        National Weather Service (NWS) data onto package delivery metrics, providing weather-specific context for
                        success rate analytics
                      </span>
                    </li>
                  </ul>
                </ExperienceItem>
              </TimelineBody>
            </TimelineItem>

            <TimelineItem className="animate-slide-up-fade opacity-0" style={{ animationDelay: '0.4s' }}>
              <TimelineHeader>
                <TimelineSeparator />
                <TimelineIcon>
                  <Briefcase className="h-4 w-4" />
                </TimelineIcon>
              </TimelineHeader>
              <TimelineBody className="-translate-y-1.5 min-w-0">
                <ExperienceItem
                  title="Associate Backend Developer at Lowe's Home Improvement"
                  date="May 2021"
                  techLogos={[Spring, Kafka, Couchbase, Redis, Java]}>
                  <p className={paragraphStyle}>
                    Worked on the pricing API for Lowe's.com and the mobile app, as well as price reports for marketing teams.
                  </p>
                  <h3 className="text-base lg:text-lg leading-none font-semibold mt-4 mb-2 text-white">Projects</h3>
                  <ul className="list-none space-y-3 text-sm lg:text-base w-full">
                    <li className="flex gap-2">
                      <span className="text-indigo-400 mt-1.5 flex-shrink-0">•</span>
                      <span className="text-white/90 break-words">
                        Developed and maintained asynchronous microservices and Couchbase databases to manage product catalog
                        updates, tracking, and changes.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-indigo-400 mt-1.5 flex-shrink-0">•</span>
                      <span className="text-white/90 break-words">
                        Built backend APIs that served real-time pricing data to tens of thousands of concurrent users on
                        lowes.com and the mobile app. Generated price reports and analytics dashboards for marketing teams to
                        support strategic decision-making.
                      </span>
                    </li>
                  </ul>
                </ExperienceItem>
              </TimelineBody>
            </TimelineItem>

            <TimelineItem className="animate-slide-up-fade opacity-0" style={{ animationDelay: '0.5s' }}>
              <TimelineHeader>
                <TimelineIcon>
                  <GraduationCap className="h-4 w-4" />
                </TimelineIcon>
              </TimelineHeader>
              <TimelineBody className="-translate-y-1.5 min-w-0">
                <ExperienceItem title="Graduated from Appalachian State University" date="May 2021">
                  <p className={paragraphStyle}>
                    Graduated from Appalachian State University with a Bachelor of Science in Computer Science.
                  </p>
                  <p className="mt-2 text-sm lg:text-base text-white font-semibold bg-indigo-400/10 border border-indigo-400/30 rounded-md px-3 py-1.5 w-fit">
                    GPA: 3.8
                  </p>
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
    <div className="flex flex-col items-start justify-center gap-3 lg:gap-4 bg-indigo-900/20 backdrop-blur-sm border border-indigo-300/30 rounded-lg p-4 sm:p-5 lg:p-6 hover:bg-indigo-900/30 hover:border-indigo-300/50 transition-all duration-300 w-full max-w-full overflow-hidden">
      <div className="flex flex-col gap-1 w-full">
        <h3 className="text-base sm:text-lg lg:text-xl leading-tight font-bold text-white break-words">{title}</h3>
        <p className="text-indigo-300 text-xs lg:text-sm font-medium">{date}</p>
      </div>
      <div className="w-full">{children}</div>
      {techLogos && techLogos.length > 0 && (
        <div className="mt-2 w-full overflow-x-auto">
          <TechCarousel items={techLogos} />
        </div>
      )}
    </div>
  );
}
