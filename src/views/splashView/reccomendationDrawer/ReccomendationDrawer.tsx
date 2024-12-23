import { useState } from 'react';
import './reccomendation-drawer.css';
import BillGates from '@assets/images/reccomenders/bill-gates.png';

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
    tagLine: 'Empowering YOUR business',
    reccomendation:
      "Nicodemus was instrumental in driving our strategic initiative to diminish Windows' usability, aligning with our overarching goals. His innovative Resume-as-a-Service solution streamlined and optimized the talent acquisition process, delivering measurable efficiency gains.",
    title: 'Former CEO of Microsoft',
    name: 'Bill Gates',
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
        <div className="arrow-control">&larr; </div>

        <div className="reccomendation-image">
          <img src={imageSrc}></img>
        </div>

        <div className="reccomendation-data">
          <h2>{tagLine}</h2>
          <blockquote>{reccomendation}</blockquote>

          <div className="reccomender-details">
            <b>{name}</b>
            <span>{title}</span>
          </div>
        </div>

        <div className="arrow-control">&rarr; </div>
      </div>
    </div>
  );
}
