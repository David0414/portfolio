import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { expCards } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  useGSAP(() => {
    gsap.utils.toArray(".timeline-card").forEach((card) => {
      gsap.from(card, {
        xPercent: -100,
        opacity: 0,
        transformOrigin: "left left",
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });
    });

    gsap.to(".timeline", {
      transformOrigin: "bottom bottom",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: "70% center",
        onUpdate: (self) => {
          gsap.to(".timeline", {
            scaleY: 1 - self.progress,
          });
        },
      },
    });

    gsap.utils.toArray(".expText").forEach((text) => {
      gsap.from(text, {
        opacity: 0,
        xPercent: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: text,
          start: "top 60%",
        },
      });
    });
  }, []);

  return (
    <section
      id="experience"
      className="flex-center md:mt-40 mt-10 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-4">
        <TitleHeader
          title="Professional Work Experience"
          sub="💼 My Career Overview"
        />
        <div className="mt-20 relative">
          <div className="relative z-50 xl:space-y-32 space-y-10">
            {expCards.map((card, index) => (
              <div
                key={card.title}
                className="exp-card-wrapper flex flex-col-reverse xl:flex-row xl:gap-16 gap-8 justify-between"
              >
                <div className="xl:w-2/6 w-full">
                  <GlowCard card={card} index={index} />
                </div>
                <div className="xl:w-4/6 w-full">
                  <div className="flex items-start gap-5 md:gap-10 xl:gap-20">
                    <div className="timeline-wrapper flex justify-center relative xl:left-[35.5vw] md:left-10 left-4 h-full">
                      <div className="timeline w-2 md:w-6 h-auto bg-black absolute z-30" />
                      <div className="gradient-line w-1 h-full" />
                    </div>
                    <div className="expText flex flex-col gap-5 relative z-20 w-full">
                      <div className="timeline-logo size-10 md:size-20 flex-none rounded-full flex justify-center items-center border border-black-50 bg-black-100">
                        <img src={card.logoPath} alt="logo" className="w-full h-full object-contain p-1" />
                      </div>
                      <div>
                        <h1 className="font-semibold text-2xl md:text-3xl">{card.title}</h1>
                        <p className="my-3 text-white-50">🗓️ {card.date}</p>
                        <p className="text-[#839CB5] italic">Responsibilities</p>
                        <ul className="list-disc ms-5 mt-3 flex flex-col gap-2 text-white-50">
                          {card.responsibilities.map((responsibility, index) => (
                            <li key={index} className="text-base md:text-lg">
                              {responsibility}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
