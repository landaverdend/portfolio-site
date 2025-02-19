import { useEffect, useState } from 'react';
import './reccomendation-drawer.css';
import BillGates from '@assets/images/reccomenders/billgates.webp';
import LarryEllison from '@assets/images/reccomenders/larryellision.webp';
import WarrenBuffet from '@assets/images/reccomenders/warren-buffet.webp';
import JensenHuang from '@assets/images/reccomenders/jensenhuang.webp';

type Testimonial = {
  imageSrc: string;
  tagLine: string;
  reccomendation: string;
  title: string;
  name: string;
};

const testimonials: Array<Testimonial> = [
  {
    imageSrc: BillGates,
    tagLine: 'Driving Actionable Items Through Uplift',
    reccomendation:
      "Nicodemus was instrumental in driving our strategic initiative to diminish Windows' usability, aligning with our overarching corporate goals. His innovative Resume-as-a-Service solution streamlined and optimized the talent acquisition process, delivering measurable efficiency gains.",
    title: 'Former CEO and Founder of Microsoft',
    name: 'Bill Gates',
  },
  {
    imageSrc: LarryEllison,
    tagLine: 'Automating YOUR Optimizations',
    reccomendation:
      "Nicodemus's groundbreaking Microservices-as-a-Mystery™ solution introduced a suite of services that seamlessly interact to achieve absolutely nothing",
    title: 'Oracle Chairman and Cofounder',
    name: 'Larry Ellison',
  },
  {
    imageSrc: WarrenBuffet,
    tagLine: 'Driving Solutions That Navigate',
    reccomendation: "It's me, Warren Buffet. I REALLY like Nicodemus.",
    title: 'CEO and Chairman of Berkshire Hathaway',
    name: 'Warren Buffet',
  },
  {
    imageSrc: JensenHuang,
    tagLine: 'Synchronizing Your Agility',
    reccomendation: "You aren't as funny as you think you are.",
    title: 'CEO and Founder of Nvidia',
    name: 'Jensen Huang',
  },
];

export default function ReccomendationDrawer() {
  const [progresses, setProgresses] = useState([0, 0, 0, 0]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isCyclingEnabled, setIsCyclingEnabled] = useState(true);

  const { name, title, reccomendation, imageSrc, tagLine } = testimonials[testimonialIndex];

  useEffect(() => {
    if (!isCyclingEnabled) return;

    let func = setInterval(() => {
      setProgresses((prev) => {
        const toUpdate = [...prev];
        toUpdate[testimonialIndex]++;

        if (toUpdate[testimonialIndex] >= 100) {
          setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
          toUpdate[testimonialIndex] = 0;
        }

        return toUpdate;
      });
    }, 60);

    return () => {
      clearInterval(func);
    };
  }, [isCyclingEnabled, testimonialIndex]);

  return (
    <div className="reccomendation-container">
      <div className="testimonial-header">
        <h2>Success Stories</h2>
        <p>
          Explore success stories from our satisfied customers. Our RaaS{'™'} platform is engineered to exceed expectations,
          equipping you with the tools needed to optimize engagement and deliver a seamless customer experience at every
          interaction.
        </p>
      </div>

      <hr />

      <div className="reccomendation-drawer">
        <div className="panel-container">
          <div className="reccomendation-info">
            <div className="reccomendation-image">
              <img src={imageSrc}></img>
            </div>
            <blockquote className="quote-area">
              <h3>{tagLine}</h3>
              <span>
                <b>"</b>
                {reccomendation}
                <b>"</b>
              </span>
              <span className="reccomender">
                <b>{name}</b>
                <br />
                <span>{title}</span>
              </span>
            </blockquote>
          </div>

          <div className="panels">
            {testimonials.map((testimonial, i) => (
              <progress
                key={testimonial.name}
                onClick={() => {
                  setTestimonialIndex(i);
                  setIsCyclingEnabled(false);
                  setProgresses((prev) => {
                    const toUpdate = [...prev];

                    for (let j = 0; j < toUpdate.length; j++) {
                      if (j === i) toUpdate[j] = 100;
                      else toUpdate[j] = 0;
                    }

                    return toUpdate;
                  });
                }}
                className={`progress-bar ${testimonialIndex === i ? 'progress-bar__active' : ''}`}
                value={progresses[i]}
                max={100}></progress>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
