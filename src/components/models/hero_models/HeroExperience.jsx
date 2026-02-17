import { AdaptiveDpr, AdaptiveEvents, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
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
      const hardwareConcurrency = navigator.hardwareConcurrency ?? 8;
      const deviceMemory = navigator.deviceMemory ?? 8;
      setIsMobile(mobile);
      setIsTablet(tablet);

      // Detectar dispositivos de muy bajo rendimiento
      const isAndroid = /Android/i.test(navigator.userAgent);
      const isLowEnd =
        mobile &&
        isAndroid &&
        (hardwareConcurrency < 4 ||
          deviceMemory < 4 ||
          /Android.*[4-6]\./.test(navigator.userAgent));
      setIsLowPerformance(isLowEnd);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Configuración adaptativa de Canvas orientada a mejor calidad móvil sin perder fluidez
  const canvasConfig = useMemo(() => {
    if (isLowPerformance) {
      return {
        dpr: [0.85, 1.15],
        shadows: false,
        antialias: false,
        alpha: false,
        powerPreference: "default",
        failIfMajorPerformanceCaveat: false,
        stencil: false,
        depth: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
        logarithmicDepthBuffer: false,
        precision: "mediump",
      };
    }

    if (isMobile) {
      return {
        dpr: [0.9, 1.3],
        shadows: false,
        antialias: false,
        alpha: false,
        powerPreference: "default",
        failIfMajorPerformanceCaveat: false,
        stencil: false,
        depth: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
        precision: "highp",
      };
    }

    return {
      dpr: [1, 1.5],
      shadows: false,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
      failIfMajorPerformanceCaveat: false,
      stencil: false,
      depth: true,
      precision: "highp",
    };
  }, [isMobile, isLowPerformance]);

  // Configuración de cámara adaptativa
  const cameraConfig = useMemo(
    () => ({
      position: isMobile ? [0, 0.4, 12.5] : [0, 0, 15],
      fov: isMobile ? 52 : 45,
      near: 0.1,
      far: 55,
    }),
    [isMobile]
  );

  // Configuración de controles adaptativa para navegación más suave
  const controlsConfig = useMemo(
    () => ({
      enablePan: false,
      enableZoom: !isTablet,
      enableRotate: !isLowPerformance && !isMobile,
      enableDamping: !isLowPerformance,
      dampingFactor: isMobile ? 0.08 : 0.06,
      maxDistance: isMobile ? 16 : 20,
      minDistance: isMobile ? 8 : 5,
      minPolarAngle: Math.PI / 5,
      maxPolarAngle: Math.PI / 2,
      autoRotate: isMobile,
      autoRotateSpeed: isLowPerformance ? 0.9 : 0.35,
      rotateSpeed: isMobile ? 0.3 : 0.55,
      target: [0, -1, 0],
    }),
    [isMobile, isTablet, isLowPerformance]
  );

  // Configuración de partículas adaptativa
  const particleCount = useMemo(() => {
    if (isLowPerformance) return 0;
    if (isMobile) return 18;
    return 50;
  }, [isMobile, isLowPerformance]);

  // Configuración de escala y posición
  const roomTransform = useMemo(
    () => ({
      scale: isLowPerformance ? 0.72 : isMobile ? 0.84 : 1,
      position: [0, isMobile ? -2.9 : -3.5, 0],
      rotation: [0, -Math.PI / 4, 0],
    }),
    [isMobile, isLowPerformance]
  );

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
      frameloop="always"
      performance={{ min: 0.45, max: 1, debounce: 120 }}
      onCreated={(state) => {
        // Optimizaciones adicionales
        state.gl.setClearColor("#000000", 1);
        state.gl.setPixelRatio(
          Math.min(window.devicePixelRatio, canvasConfig.dpr[1])
        );
        state.gl.outputColorSpace = THREE.SRGBColorSpace;
        state.gl.toneMapping = THREE.ACESFilmicToneMapping;
        state.gl.toneMappingExposure = isMobile ? 1.05 : 1.12;

        // Configurar precisión para móviles
        if (isMobile) {
          state.gl.precision = canvasConfig.precision;
        }

        // Configurar frustum culling más agresivo
        state.camera.far = 55;
        state.camera.updateProjectionMatrix();
      }}
    >
      <AdaptiveEvents />
      <AdaptiveDpr />

      {/* Luz ambiental simplificada */}
      <ambientLight
        intensity={isLowPerformance ? 0.34 : isMobile ? 0.3 : 0.28}
        color={isLowPerformance ? "#f6f7ff" : "#1a1a40"}
      />

      {/* Controles optimizados */}
      <OrbitControls {...controlsConfig} />

      <Suspense fallback={<LoadingFallback />}>
        <HeroLights />

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
