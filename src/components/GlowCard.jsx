import { useRef, useEffect } from "react";

const GlowCard = ({ card, index, children }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Solo aplicar efecto glow en desktop
      if (window.innerWidth >= 768) {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
        angle = (angle + 360) % 360;
        card.style.setProperty("--start", angle + 60);
      }
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove, { passive: true });
      
      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="card card-border timeline-card rounded-xl p-4 md:p-6 mb-4 md:mb-6 break-inside-avoid-column"
    >
      {/* Glow effect - solo en desktop */}
      <div className="glow hidden md:block"></div>
      
      {/* Estrellas con tamaño responsive */}
      <div className="flex items-center gap-1 md:gap-2 mb-3 md:mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <img 
            key={i} 
            src="/images/star.png" 
            alt="star" 
            className="size-3 md:size-4 star-icon" 
          />
        ))}
      </div>
      
      {/* Contenido de la tarjeta */}
      <div className="mb-4 md:mb-5">
        <p className="text-white-50 text-sm md:text-base leading-relaxed">
          {card.review}
        </p>
      </div>
      
      {/* Contenido adicional */}
      {children}
    </div>
  );
};

export default GlowCard;
