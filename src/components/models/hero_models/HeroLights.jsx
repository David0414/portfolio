import * as THREE from "three";
import { useMemo, useState, useEffect } from "react";

const HeroLights = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    
    // Detectar dispositivos de muy bajo rendimiento
    const isLowEnd = mobile && (
      navigator.hardwareConcurrency < 4 || 
      navigator.deviceMemory < 4 ||
      /Android.*[4-6]\.|iPhone.*OS [4-9]_/.test(navigator.userAgent)
    );
    setIsLowPerformance(isLowEnd);
  }, []);

  // Configuración de luces adaptativa
  const lightConfig = useMemo(() => {
    if (isLowPerformance) {
      // Solo una luz para dispositivos muy lentos
      return {
        primary: {
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
          position: [2.5, 4.8, 5],
<<<<<<< ours
          intensity: 38,
=======
          intensity: 45,
>>>>>>> theirs
=======
          position: [2, 5, 6],
          intensity: 80,
>>>>>>> theirs
=======
          position: [2, 5, 6],
          intensity: 80,
>>>>>>> theirs
=======
          position: [2, 5, 6],
          intensity: 80,
>>>>>>> theirs
=======
          position: [2, 5, 6],
          intensity: 80,
>>>>>>> theirs
          color: "#ffffff",
          angle: 0.3,
          penumbra: 0.5
        }
      };
    } else if (isMobile) {
      // Luces reducidas para móviles
      return {
        primary: {
          position: [2, 5, 6],
          intensity: 60,
          color: "white",
          angle: 0.2,
          penumbra: 0.3
        },
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
        fill: {
          position: [-2.5, 2.5, 2],
<<<<<<< ours
          intensity: 6,
          color: "#93c5fd",
=======
          intensity: 10,
          color: "#a5b4fc",
>>>>>>> theirs
          distance: 12,
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
        secondary: {
          position: [4, 5, 4],
          intensity: 25,
          color: "#4cc9f0",
          angle: 0.4,
          penumbra: 0.6
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
        },
        ambient: {
          position: [0, 1, 0],
          intensity: 8,
          color: "#7209b7"
        }
      };
    } else {
      // Configuración completa para desktop
      return {
        primary: {
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
          position: [2.2, 5, 6],
<<<<<<< ours
          intensity: 58,
=======
          intensity: 64,
>>>>>>> theirs
          color: "#ffffff",
          angle: 0.23,
          penumbra: 0.35,
          distance: 27,
        },
        secondary: {
          position: [4, 5, 4],
<<<<<<< ours
          intensity: 22,
=======
          intensity: 28,
>>>>>>> theirs
          color: "#60a5fa",
=======
          position: [2, 5, 6],
          intensity: 100,
          color: "white",
          angle: 0.15,
          penumbra: 0.2
        },
        secondary: {
          position: [4, 5, 4],
=======
          position: [2, 5, 6],
          intensity: 100,
          color: "white",
          angle: 0.15,
          penumbra: 0.2
        },
        secondary: {
          position: [4, 5, 4],
>>>>>>> theirs
=======
          position: [2, 5, 6],
          intensity: 100,
          color: "white",
          angle: 0.15,
          penumbra: 0.2
        },
        secondary: {
          position: [4, 5, 4],
>>>>>>> theirs
=======
          position: [2, 5, 6],
          intensity: 100,
          color: "white",
          angle: 0.15,
          penumbra: 0.2
        },
        secondary: {
          position: [4, 5, 4],
>>>>>>> theirs
          intensity: 40,
          color: "#4cc9f0",
          angle: 0.3,
          penumbra: 0.5
        },
        fill: {
          position: [-3, 5, 5],
          intensity: 60,
          color: "#9d4edd",
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
          angle: 0.4,
          penumbra: 1
        },
        area: {
          position: [1, 3, 4],
          rotation: [-Math.PI / 4, Math.PI / 4, 0],
          intensity: 15,
          color: "#a259ff",
          width: 3,
          height: 2
        },
        ambient1: {
          position: [0, 1, 0],
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
          intensity: 6,
          color: "#8b5cf6",
=======
          intensity: 9,
          color: "#a78bfa",
>>>>>>> theirs
          distance: 16,
=======
          intensity: 10,
          color: "#7209b7"
>>>>>>> theirs
=======
          intensity: 10,
          color: "#7209b7"
>>>>>>> theirs
=======
          intensity: 10,
          color: "#7209b7"
>>>>>>> theirs
=======
          intensity: 10,
          color: "#7209b7"
>>>>>>> theirs
        },
        ambient2: {
          position: [1, 2, -2],
          intensity: 10,
          color: "#0d00a4"
        }
      };
    }
  }, [isMobile, isLowPerformance]);

  // Renderizado condicional basado en rendimiento
  if (isLowPerformance) {
    return (
      <spotLight
        position={lightConfig.primary.position}
        angle={lightConfig.primary.angle}
        penumbra={lightConfig.primary.penumbra}
        intensity={lightConfig.primary.intensity}
        color={lightConfig.primary.color}
        castShadow={false}
        decay={2}
        distance={30}
      />
    );
  }

  if (isMobile) {
    return (
      <>
        {/* Luz principal */}
        <spotLight
          position={lightConfig.primary.position}
          angle={lightConfig.primary.angle}
          penumbra={lightConfig.primary.penumbra}
          intensity={lightConfig.primary.intensity}
          color={lightConfig.primary.color}
          castShadow={false}
          decay={2}
          distance={25}
        />
        
        {/* Luz secundaria */}
        <spotLight
          position={lightConfig.secondary.position}
          angle={lightConfig.secondary.angle}
          penumbra={lightConfig.secondary.penumbra}
          intensity={lightConfig.secondary.intensity}
          color={lightConfig.secondary.color}
          castShadow={false}
          decay={2}
          distance={25}
        />
        
        {/* Luz ambiental suave */}
        <pointLight 
          position={lightConfig.ambient.position} 
          intensity={lightConfig.ambient.intensity} 
          color={lightConfig.ambient.color}
          decay={2}
          distance={15}
        />
      </>
    );
  }

  // Configuración completa para desktop
  return (
    <>
      {/* Luz principal de la lámpara */}
      <spotLight
        position={lightConfig.primary.position}
        angle={lightConfig.primary.angle}
        penumbra={lightConfig.primary.penumbra}
        intensity={lightConfig.primary.intensity}
        color={lightConfig.primary.color}
        castShadow={false}
        decay={2}
        distance={30}
      />
      
      {/* Luz superior azulada */}
      <spotLight
        position={lightConfig.secondary.position}
        angle={lightConfig.secondary.angle}
        penumbra={lightConfig.secondary.penumbra}
        intensity={lightConfig.secondary.intensity}
        color={lightConfig.secondary.color}
        castShadow={false}
        decay={2}
        distance={30}
      />
      
      {/* Luz lateral púrpura */}
      <spotLight
        position={lightConfig.fill.position}
        angle={lightConfig.fill.angle}
        penumbra={lightConfig.fill.penumbra}
        intensity={lightConfig.fill.intensity}
        color={lightConfig.fill.color}
        castShadow={false}
        decay={2}
        distance={30}
      />
      
      {/* Luz de área suave */}
      <primitive
        object={new THREE.RectAreaLight(
          lightConfig.area.color, 
          lightConfig.area.intensity, 
          lightConfig.area.width, 
          lightConfig.area.height
        )}
        position={lightConfig.area.position}
        rotation={lightConfig.area.rotation}
      />
      
      {/* Luces puntuales ambientales */}
      <pointLight 
        position={lightConfig.ambient1.position} 
        intensity={lightConfig.ambient1.intensity} 
        color={lightConfig.ambient1.color}
        decay={2}
        distance={20}
      />
      <pointLight 
        position={lightConfig.ambient2.position} 
        intensity={lightConfig.ambient2.intensity} 
        color={lightConfig.ambient2.color}
        decay={2}
        distance={20}
      />
    </>
  );
};

export default HeroLights;