import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo, useState, useEffect } from "react";

import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";

const HeroExperience = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      const tablet = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsTablet(tablet);
      
      // Detectar dispositivos de muy bajo rendimiento
      const isLowEnd = mobile && (
        navigator.hardwareConcurrency < 4 || 
        navigator.deviceMemory < 4 ||
        /Android.*[4-6]\.|iPhone.*OS [4-9]_/.test(navigator.userAgent)
      );
      setIsLowPerformance(isLowEnd);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Configuración adaptativa de Canvas
  const canvasConfig = useMemo(() => {
    if (isLowPerformance) {
      return {
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
        dpr: [0.65, 1],
=======
        dpr: [0.9, 1.25],
>>>>>>> theirs
=======
        dpr: [0.3, 0.6],
>>>>>>> theirs
=======
        dpr: [0.3, 0.6],
>>>>>>> theirs
=======
        dpr: [0.3, 0.6],
>>>>>>> theirs
=======
        dpr: [0.3, 0.6],
>>>>>>> theirs
        shadows: false,
        antialias: false,
        alpha: false,
        powerPreference: "low-power",
        failIfMajorPerformanceCaveat: false,
        stencil: false,
        depth: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
        logarithmicDepthBuffer: false,
        precision: 'lowp'
      };
    } else if (isMobile) {
      return {
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
        dpr: [0.85, 1.5],
=======
        dpr: [1, 2],
>>>>>>> theirs
=======
        dpr: [0.5, 1.0],
>>>>>>> theirs
=======
        dpr: [0.5, 1.0],
>>>>>>> theirs
=======
        dpr: [0.5, 1.0],
>>>>>>> theirs
=======
        dpr: [0.5, 1.0],
>>>>>>> theirs
        shadows: false,
        antialias: false,
        alpha: false,
        powerPreference: "default",
        failIfMajorPerformanceCaveat: false,
        stencil: false,
        depth: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
        precision: 'mediump'
      };
    } else {
      return {
        dpr: [1, 1.5],
        shadows: false,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveal: false,
        stencil: false,
        depth: true,
        precision: 'highp'
      };
    }
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours

    return {
<<<<<<< ours
      dpr: [1, 1.75],
=======
      dpr: [1.25, 2],
>>>>>>> theirs
      shadows: false,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
      failIfMajorPerformanceCaveat: false,
      stencil: false,
      depth: true,
      precision: "highp",
    };
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
  }, [isMobile, isLowPerformance]);

  // Configuración de cámara adaptativa
  const cameraConfig = useMemo(() => ({
    position: isMobile ? [0, 0, 12] : [0, 0, 15],
    fov: isMobile ? 55 : 45,
    near: 0.1,
    far: 50 // Reducido para mejor culling
  }), [isMobile]);

  // Configuración de controles adaptativa
  const controlsConfig = useMemo(() => ({
    enablePan: false,
    enableZoom: !isTablet,
    enableRotate: !isLowPerformance,
    enableDamping: !isMobile,
    dampingFactor: 0.05,
    maxDistance: isMobile ? 15 : 20,
    minDistance: isMobile ? 8 : 5,
    minPolarAngle: Math.PI / 5,
    maxPolarAngle: Math.PI / 2,
    autoRotate: false,
    rotateSpeed: isMobile ? 0.3 : 0.5,
    target: [0, -1, 0] // Centrar la vista
  }), [isMobile, isTablet, isLowPerformance]);

  // Configuración de partículas adaptativa
  const particleCount = useMemo(() => {
    if (isLowPerformance) return 0; // Sin partículas
    if (isMobile) return 20;
    return 50;
  }, [isMobile, isLowPerformance]);

  // Configuración de escala y posición
  const roomTransform = useMemo(() => ({
    scale: isLowPerformance ? 0.6 : (isMobile ? 0.7 : 1),
    position: [0, isMobile ? -2.5 : -3.5, 0],
    rotation: [0, -Math.PI / 4, 0]
  }), [isMobile, isLowPerformance]);

  // Componente de Room memoizado
  const MemoizedRoom = useMemo(() => <Room />, []);

  // Componente de carga personalizado
  const LoadingFallback = () => (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color="#4cc9f0" transparent opacity={0.6} />
    </mesh>
  );

  return (
    <Canvas 
      camera={cameraConfig}
      dpr={canvasConfig.dpr}
      gl={canvasConfig}
      shadows={canvasConfig.shadows}
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
      frameloop="always"
<<<<<<< ours
      performance={{ min: 0.45, max: 1, debounce: 120 }}
=======
      performance={{ min: 0.6, max: 1, debounce: 80 }}
>>>>>>> theirs
      onCreated={(state) => {
        // Optimizaciones adicionales
        state.gl.setClearColor("#000000", 1);
        state.gl.setPixelRatio(
          Math.min(window.devicePixelRatio, canvasConfig.dpr[1])
        );
<<<<<<< ours
=======
        state.gl.outputColorSpace = THREE.SRGBColorSpace;
        state.gl.toneMapping = THREE.ACESFilmicToneMapping;
        state.gl.toneMappingExposure = isMobile ? 1.05 : 1;
>>>>>>> theirs

=======
      frameloop={isLowPerformance ? "demand" : "always"}
      performance={{ min: 0.2, max: 1, debounce: 200 }}
      onCreated={(state) => {
        // Optimizaciones adicionales
        state.gl.setClearColor('#000000', 1);
        state.gl.pixelRatio = Math.min(window.devicePixelRatio, canvasConfig.dpr[1]);
        
>>>>>>> theirs
=======
      frameloop={isLowPerformance ? "demand" : "always"}
      performance={{ min: 0.2, max: 1, debounce: 200 }}
      onCreated={(state) => {
        // Optimizaciones adicionales
        state.gl.setClearColor('#000000', 1);
        state.gl.pixelRatio = Math.min(window.devicePixelRatio, canvasConfig.dpr[1]);
        
>>>>>>> theirs
=======
      frameloop={isLowPerformance ? "demand" : "always"}
      performance={{ min: 0.2, max: 1, debounce: 200 }}
      onCreated={(state) => {
        // Optimizaciones adicionales
        state.gl.setClearColor('#000000', 1);
        state.gl.pixelRatio = Math.min(window.devicePixelRatio, canvasConfig.dpr[1]);
        
>>>>>>> theirs
=======
      frameloop={isLowPerformance ? "demand" : "always"}
      performance={{ min: 0.2, max: 1, debounce: 200 }}
      onCreated={(state) => {
        // Optimizaciones adicionales
        state.gl.setClearColor('#000000', 1);
        state.gl.pixelRatio = Math.min(window.devicePixelRatio, canvasConfig.dpr[1]);
        
>>>>>>> theirs
        // Configurar precisión para móviles
        if (isMobile) {
          state.gl.precision = canvasConfig.precision;
        }
        
        // Configurar frustum culling más agresivo
        state.camera.far = 50;
        state.camera.updateProjectionMatrix();
      }}
    >
      {/* Luz ambiental simplificada */}
      <ambientLight 
        intensity={isLowPerformance ? 0.6 : 0.2} 
        color={isLowPerformance ? "#ffffff" : "#1a1a40"} 
      />
      
      {/* Controles optimizados */}
      <OrbitControls {...controlsConfig} />
      
      <Suspense fallback={<LoadingFallback />}>
        {/* Luces - solo en dispositivos con buen rendimiento */}
        {!isLowPerformance && <HeroLights />}
        
        {/* Partículas - adaptativas */}
        {particleCount > 0 && <Particles count={particleCount} />}
        
        {/* Modelo principal */}
        <group
          scale={roomTransform.scale}
          position={roomTransform.position}
          rotation={roomTransform.rotation}
          frustumCulled={true}
        >
          {MemoizedRoom}
        </group>
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;