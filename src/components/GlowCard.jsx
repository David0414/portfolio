import { useRef, useEffect, useState } from "react";

const GlowCard = ({ card, index, children }) => {
  const cardRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Verifica si el dispositivo es móvil al cargar el componente
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleMouseMove = (index) => (e) => {
    if (isMobile) return; // Evita cálculos en móvil

    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    angle = (angle + 360) % 360;
    card.style.setProperty("--start", angle + 60);
  };

  return (
    <div
      ref={(el) => (cardRefs.current[index] = el)}
      onMouseMove={handleMouseMove(index)}
      className="card card-border timeline-card rounded-xl p-6 md:p-10 mb-5 break-inside-avoid-column"
    >
      {/* Solo aplica glow si no es móvil */}
      {!isMobile && <div className="glow"></div>}

      <div className="flex items-center gap-1 mb-3 md:mb-5">
        {Array.from({ length: 5 }, (_, i) => (
          <img key={i} src="/images/star.png" alt="star" className="size-4 md:size-5" />
        ))}
      </div>
      <div className="mb-3 md:mb-5">
        <p className="text-white-50 text-base md:text-lg">{card.review}</p>
      </div>
      {children}
    </div>
  );
};

export default GlowCard;
