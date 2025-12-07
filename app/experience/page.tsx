'use client';

import { Timeline, TimelineItem, TimelineHeader, TimelineSeparator, TimelineIcon, TimelineBody } from '@/components/ui/timeline';
import { Bell, Briefcase, DollarSign, Home, School } from 'lucide-react';

export default function Experience() {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-10 gap-5">
      <h1 className="text-2xl font-bold">Experience</h1>
      <div className="w-3/5 flex items-center justify-center ">
        <Timeline color="secondary" orientation="vertical">
          
          <TimelineItem>
            <TimelineHeader>
              <TimelineSeparator />
              <TimelineIcon>
                <Briefcase className="h-4 w-4" />
              </TimelineIcon>
            </TimelineHeader>
            <TimelineBody className="-translate-y-1.5">
              <div className="space-y-1">
                <h3 className="text-base leading-none font-semibold">Full Stack Developer at Clearwave Corporation</h3>
                <p className="text-muted-foreground text-xs">March 2022 - Present</p>
              </div>
              <p className="text-muted-foreground mt-3 text-sm">
                Successfully established the new office location with all necessary equipment and infrastructure in place. The
                team is ready to begin operations.
              </p>
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
              <div className="space-y-1">
                <h3 className="text-base leading-none font-semibold">Full Stack Developer at ECS Federal</h3>
                <p className="text-muted-foreground text-xs">March 2022</p>
              </div>
              <p className="text-muted-foreground mt-3 text-sm">
                Successfully established the new office location with all necessary equipment and infrastructure in place. The
                team is ready to begin operations.
              </p>
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
              <div className="space-y-1">
                <h3 className="text-base leading-none font-semibold">Associate Backend Developer at Lowe's Home Improvement</h3>
                <p className="text-muted-foreground text-xs">May 2021</p>
              </div>
              <p className="text-muted-foreground mt-3 text-sm">
                Joined Lowe's Home Improvement as an Associate Software Engineer working on cloud microservices and APIs that
                powered the Lowe's Home Improvement website and mobile app.
              </p>
            </TimelineBody>
          </TimelineItem>

          <TimelineItem>
            <TimelineHeader>
              <TimelineIcon>
                <School className="h-4 w-4" />
              </TimelineIcon>
            </TimelineHeader>
            <TimelineBody className="-translate-y-1.5">
              <div className="space-y-1">
                <h3 className="text-base leading-none font-semibold">Graduated from Appalachian State University</h3>
                <p className="text-muted-foreground text-xs">May 2021</p>
              </div>
              <p className="text-muted-foreground mt-3 text-sm">
                Graduated from Appalachian State University with a Bachelor of Science in Computer Science. Add electives and
                other courses here
              </p>
            </TimelineBody>
          </TimelineItem>
        </Timeline>
      </div>
    </div>
  );
}
