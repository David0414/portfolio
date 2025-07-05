import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

import { expCards } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const isMobile = window.innerWidth < 768;

  useGSAP(() => {
    if (!isMobile) {
      // Animaciones para PC (cuando no es móvil)
      gsap.utils.toArray(".timeline-card").forEach((card) => {
        gsap.from(card, {
          xPercent: -100,
          opacity: 0,
          transformOrigin: "left left",
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: card,
            start: "top 80%", // Esto puede ser ajustado para garantizar que se vea al cargar
            toggleActions: "play none none none", // Esto asegura que la animación se ejecute cuando el elemento entra en vista
            once: true, // Asegura que se ejecute solo una vez
          },
        });
      });

      // Animación de la línea de tiempo
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
          toggleActions: "play none none none", // Para asegurar que la animación se ejecute correctamente
          once: true, // Esto asegura que la animación se ejecute solo una vez
        },
      });

      // Animación de los textos
      gsap.utils.toArray(".expText").forEach((text) => {
        gsap.from(text, {
          opacity: 0,
          xPercent: 0,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: text,
            start: "top 60%", // Asegura que el texto se cargue en la posición correcta
            toggleActions: "play none none none", // Para asegurar que la animación se ejecute correctamente
            once: true, // Esto asegura que la animación se ejecute solo una vez
          },
        });
      });
    } else {
      // Para móviles, eliminar las animaciones
      gsap.utils.toArray(".timeline-card").forEach((card) => {
        gsap.set(card, { opacity: 1, xPercent: 0 });
      });
      gsap.set(".timeline", { scaleY: 1 });
      gsap.utils.toArray(".expText").forEach((text) => {
        gsap.set(text, { opacity: 1, xPercent: 0 });
      });
    }
  }, []);

  return (
    <section
      id="experience"
      className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader
          title="Professional Work Experience"
          sub="💼 My Career Overview"
        />
        <div className="mt-20 md:mt-32 relative">
          <div className="relative z-50 xl:space-y-32 space-y-10">
            {expCards.map((card) => (
              <div key={card.title} className="exp-card-wrapper">
                <div className="xl:w-2/6 flex justify-center items-center">
                  {/* Ajuste de la imagen */}
                  <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full w-16 h-16 flex justify-center items-center text-white font-semibold text-xl">
                    1 {/* Número dentro del círculo */}
                  </div>
                </div>
                <div className="xl:w-4/6">
                  <div className="flex items-start">
                    <div className="timeline-wrapper">
                      <div className="timeline" />
                      <div className="gradient-line w-1 h-full" />
                    </div>
                    <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                      <div className="timeline-logo">
                        <img src={card.logoPath} alt="logo" className="w-20 h-15 md:w-28 md:h-28" />
                      </div>
                      <div>
                        <h1 className="font-semibold text-3xl">{card.title}</h1>
                        <p className="my-5 text-white-50">
                          🗓️&nbsp;{card.date}
                        </p>
                        <p className="text-[#839CB5] italic">
                          Responsibilities
                        </p>
                        <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                          {card.responsibilities.map(
                            (responsibility, index) => (
                              <li key={index} className="text-lg">
                                {responsibility}
                              </li>
                            )
                          )}
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
