import { useState } from 'react';
import './reccomendation-drawer.css';
import BillGates from '@assets/images/reccomenders/billgates.webp';
import LarryEllison from '@assets/images/reccomenders/larryellision.webp';
import WarrenBuffet from '@assets/images/reccomenders/warren-buffet.webp';
import JensenHuang from '@assets/images/reccomenders/jensenhuang.webp';
import Microsoft from '@assets/images/dock/microsoft.svg';
import Nvidia from '@assets/images/dock/nvidia.svg';
import Oracle from '@assets/images/dock/Oracle.svg';
import BerkshireHathaway from '@assets/images/dock/berskhire-hathaway.svg';

type Testimonial = {
  imageSrc: string;
  tagLine: string;
  reccomendation: string;
  title: string;
  name: string;
  companySvg: {
    src: string;
    height: string;
  };
};

const testimonials: Array<Testimonial> = [
  {
    imageSrc: BillGates,
    tagLine: 'Driving Actionable Items Through Uplift',
    reccomendation:
      "Nicodemus was instrumental in driving our strategic initiative to diminish Windows' usability, aligning with our overarching goals. His innovative Resume-as-a-Service solution streamlined and optimized the talent acquisition process, delivering measurable efficiency gains.",
    title: 'Former CEO and Founder of Microsoft',
    name: 'Bill Gates',
    companySvg: { src: Microsoft, height: '80%' },
  },
  {
    imageSrc: LarryEllison,
    tagLine: 'Automating YOUR Optimizations',
    reccomendation:
      "Nicodemus's groundbreaking Microservices-as-a-Mystery™ solution introduced a suite of services that seamlessly interact to achieve absolutely nothing",
    title: 'Oracle Chairman and Cofounder',
    name: 'Larry Ellison',
    companySvg: { src: Oracle, height: '80%' },
  },
  {
    imageSrc: WarrenBuffet,
    tagLine: 'Driving Solutions That Navigate',
    reccomendation: "It's me, Warren Buffet. I REALLY like Nicodemus.",
    title: 'CEO and Chairman of Berkshire Hathaway',
    name: 'Warren Buffet',
    companySvg: { src: BerkshireHathaway, height: '80%' },
  },
  {
    imageSrc: JensenHuang,
    tagLine: 'Synchronizing Your Agility',
    reccomendation: "You aren't as funny as you think you are.",
    title: 'CEO and Founder of Nvidia',
    name: 'Jensen Huang',
    companySvg: { src: Nvidia, height: '80%' },
  },
];

export default function ReccomendationDrawer() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const { name, title, reccomendation, imageSrc, tagLine } = testimonials[testimonialIndex];

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
              <span
                key={crypto.randomUUID()}
                className="panel-item"
                onClick={() => {
                  setTestimonialIndex(i);
                }}
                style={{ borderTop: `3px solid ${i === testimonialIndex ? '#f6b614' : 'var(--main-indigo)'}` }}>
                <img
                  src={testimonial.companySvg.src}
                  style={{
                    height: testimonial.companySvg.height,
                  }}></img>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
