import TitleHeader from "../components/TitleHeader";
import { techStackIcons } from "../constants";
import { useState, useEffect } from "react";

const TechStack = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Simular carga completa
    setTimeout(() => setIsLoading(false), 100);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const iconsToRender = isMobile ? techStackIcons.slice(0, 8) : techStackIcons;

  // Estilos CSS como objetos JavaScript
  const styles = {
    techGrid: {
      display: 'grid',
      gap: '1rem',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(140px, 1fr))',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isMobile ? '0.5rem 0' : '1rem 0',
      ...(window.innerWidth <= 480 && {
        gap: '0.5rem'
      })
    },
    techCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      padding: '1rem',
      minHeight: '120px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      transform: 'translateZ(0)',
      willChange: 'transform',
      WebkitTapHighlightColor: 'transparent',
      WebkitTransform: 'translateZ(0)',
      MozTransform: 'translateZ(0)',
      msTransform: 'translateZ(0)',
      OTransform: 'translateZ(0)',
      WebkitBackfaceVisibility: 'hidden',
      MozBackfaceVisibility: 'hidden',
      msBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
      WebkitPerspective: '1000px',
      MozPerspective: '1000px',
      msPerspective: '1000px',
      perspective: '1000px',
      transition: isMobile ? 'none' : 'transform 0.2s ease-out, box-shadow 0.2s ease-out',
      cursor: 'pointer'
    },
    techCardContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.75rem',
      width: '100%'
    },
    techIconWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    techIcon: {
      transition: isMobile ? 'none' : 'transform 0.2s ease-out',
      willChange: 'transform',
      imageRendering: 'optimizeQuality',
      WebkitTransform: 'translateZ(0)'
    },
    skeletonCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      minHeight: '120px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'pulse 1.5s ease-in-out infinite'
    },
    skeletonIcon: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '4px'
    },
    skeletonText: {
      height: '1rem',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '4px',
      width: '75%',
      margin: '0 auto'
    }
  };

  // Manejadores de eventos para móviles
  const handleTouchStart = (e) => {
    if (isMobile) {
      e.currentTarget.style.transform = 'scale(0.98)';
      e.currentTarget.style.transition = 'transform 0.1s ease-out';
    }
  };

  const handleTouchEnd = (e) => {
    if (isMobile) {
      e.currentTarget.style.transform = 'scale(1)';
    }
  };

  const handleMouseEnter = (e) => {
    if (!isMobile) {
      e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
      const icon = e.currentTarget.querySelector('.tech-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1)';
      }
    }
  };

  const handleMouseLeave = (e) => {
    if (!isMobile) {
      e.currentTarget.style.transform = 'translateZ(0)';
      e.currentTarget.style.boxShadow = 'none';
      const icon = e.currentTarget.querySelector('.tech-icon');
      if (icon) {
        icon.style.transform = 'scale(1)';
      }
    }
  };

  if (isLoading) {
    return (
      <div id="skills" className="flex-center section-padding">
        <div className="w-full h-full md:px-10 px-5">
          <TitleHeader
            title="How I Can Contribute & My Key Skills"
            sub="🤝 What I Bring to the Table"
          />
          <div style={styles.techGrid}>
            {Array.from({ length: isMobile ? 8 : techStackIcons.length }).map((_, index) => (
              <div
                key={index}
                className="card-border rounded-lg"
                style={styles.skeletonCard}
              >
                <div style={styles.techCardContent}>
                  <div style={styles.techIconWrapper}>
                    <div 
                      className="w-14 h-14 md:w-20 md:h-20"
                      style={styles.skeletonIcon}
                    ></div>
                  </div>
                  <div className="padding-x w-full">
                    <div style={styles.skeletonText}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="skills" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="🤝 What I Bring to the Table"
        />
        <div style={styles.techGrid}>
          {iconsToRender.map((techStackIcon, index) => (
            <div
              key={techStackIcon.name}
              className="card-border rounded-lg overflow-hidden group"
              style={styles.techCard}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div style={styles.techCardContent}>
                <div style={styles.techIconWrapper}>
                  <img
                    src={techStackIcon.imgPath}
                    alt={techStackIcon.name}
                    className="tech-icon w-14 h-14 md:w-20 md:h-20 object-contain"
                    style={styles.techIcon}
                    loading={index < 6 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
                <div className="padding-x w-full">
                  <p className="text-sm md:text-base text-center">{techStackIcon.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estilos CSS para la animación pulse */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default TechStack;