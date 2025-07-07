import { useRef } from "react";

const GlowCard = ({ card, index, children }) => {
  const cardRefs = useRef([]);

  const handleMouseMove = (index) => (e) => {
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
      className="card card-border timeline-card rounded-xl p-6 mb-6 break-inside-avoid-column"
    >
      <div className="glow"></div>
      <div className="flex items-center gap-2 mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <img key={i} src="/images/star.png" alt="star" className="size-4" />
        ))}
      </div>
      <div className="mb-5">
        <p className="text-white-50 text-base">{card.review}</p>
      </div>
      {children}
    </div>
  );
};

export default GlowCard;
