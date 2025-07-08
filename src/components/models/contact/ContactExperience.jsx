import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useInView } from "react-intersection-observer";
import { Suspense, useMemo, useState, useEffect } from "react";
import Computer from "./Computer";

const ContactExperience = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05, // Reducido para activarse antes
    rootMargin: "50px"
  });

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Detectar dispositivos de bajo rendimiento
      const isLowEnd = mobile && (
        navigator.hardwareConcurrency < 4 || 
        navigator.deviceMemory < 4 ||
        /Android.*4\.|iPhone.*OS [4-9]_/.test(navigator.userAgent)
      );
      setIsLowPerformance(isLowEnd);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Configuración optimizada basada en dispositivo
  const canvasConfig = useMemo(() => {
    if (isLowPerformance) {
      return {
        dpr: [0.5, 0.8],
        shadows: false,
        antialias: false,
        alpha: false,
        powerPreference: "low-power",
        failIfMajorPerformanceCaveat: false,
        stencil: false,
        depth: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
        logarithmicDepthBuffer: false
      };
    } else if (isMobile) {
      return {
        dpr: [0.7, 1.2],
        shadows: false,
        antialias: false,
        alpha: false,
        powerPreference: "default",
        failIfMajorPerformanceCaveat: false,
        stencil: false,
        depth: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false
      };
    } else {
      return {
        dpr: [1, 1.5],
        shadows: false,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
        stencil: false,
        depth: true
      };
    }
  }, [isMobile, isLowPerformance]);

  const cameraConfig = useMemo(() => ({
    position: isMobile ? [0, 2, 5] : [0, 3, 7],
    fov: isMobile ? 50 : 45,
    near: 0.1,
    far: 100
  }), [isMobile]);

  const lightConfig = useMemo(() => {
    if (isLowPerformance) {
      return {
        ambient: { intensity: 0.6, color: "#fff4e6" },
        directional: [
          { position: [5, 5, 3], intensity: 1.0, color: "#ffd9b3" }
        ]
      };
    } else if (isMobile) {
      return {
        ambient: { intensity: 0.5, color: "#fff4e6" },
        directional: [
          { position: [5, 5, 3], intensity: 1.2, color: "#ffd9b3" }
        ]
      };
    } else {
      return {
        ambient: { intensity: 0.4, color: "#fff4e6" },
        directional: [
          { position: [5, 5, 3], intensity: 1.5, color: "#ffd9b3" },
          { position: [5, 9, 1], intensity: 1.5, color: "#ffd9b3" }
        ]
      };
    }
  }, [isMobile, isLowPerformance]);

  const orbitControlsConfig = useMemo(() => ({
    enableZoom: false,
    enablePan: false,
    enableRotate: !isLowPerformance,
    enableDamping: !isMobile,
    dampingFactor: 0.05,
    minPolarAngle: Math.PI / 5,
    maxPolarAngle: Math.PI / 2,
    autoRotate: false,
    autoRotateSpeed: 0.5,
    rotateSpeed: isMobile ? 0.3 : 0.5,
    maxDistance: 15,
    minDistance: 3
  }), [isMobile, isLowPerformance]);

  const modelScale = useMemo(() => {
    if (isLowPerformance) return 0.025;
    if (isMobile) return 0.028;
    return 0.03;
  }, [isMobile, isLowPerformance]);

  // Componente de carga optimizado
  const LoadingFallback = () => (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#ffd9b3',
      fontSize: isMobile ? '14px' : '16px',
      fontWeight: '300',
      textAlign: 'center'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid rgba(255, 217, 179, 0.3)',
        borderTop: '3px solid #ffd9b3',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 10px'
      }} />
      Loading 3D Model...
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  return (
    <div ref={ref} className="w-full h-full relative">
      {inView && (
        <Canvas
          dpr={canvasConfig.dpr}
          shadows={canvasConfig.shadows}
          camera={cameraConfig}
          gl={canvasConfig}
          frameloop="demand" // Solo renderiza cuando es necesario
          performance={{ min: 0.1, max: 1, debounce: 200 }}
          onCreated={(state) => {
            // Optimizaciones adicionales
            state.gl.setClearColor('#000000', 0);
            state.gl.pixelRatio = Math.min(window.devicePixelRatio, canvasConfig.dpr[1]);
            
            // Configurar precisión para móviles
            if (isMobile) {
              state.gl.precision = 'mediump';
            }
          }}
        >
          {/* Iluminación optimizada */}
          <ambientLight 
            intensity={lightConfig.ambient.intensity} 
            color={lightConfig.ambient.color} 
          />
          {lightConfig.directional.map((light, index) => (
            <directionalLight
              key={index}
              position={light.position}
              intensity={light.intensity}
              color={light.color}
              castShadow={false}
            />
          ))}

          <OrbitControls {...orbitControlsConfig} />

          {/* Plano del suelo optimizado */}
          <group scale={[1, 1, 1]}>
            <mesh
              receiveShadow={false}
              position={[0, -1.5, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              frustumCulled={true}
            >
              <planeGeometry args={isMobile ? [20, 20] : [30, 30]} />
              <meshBasicMaterial 
                color="#a46b2d" 
                transparent={false}
                fog={false}
              />
            </mesh>
          </group>

          {/* Modelo 3D con Suspense optimizado */}
          <Suspense fallback={<LoadingFallback />}>
            <group 
              scale={modelScale} 
              position={[0, -1.49, -2]} 
              castShadow={false}
              frustumCulled={true}
            >
              <Computer />
            </group>
          </Suspense>
        </Canvas>
      )}
      
      {/* Indicador de carga inicial */}
      {!inView && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#ffd9b3',
          fontSize: '14px',
          opacity: 0.7
        }}>
          Scroll to load 3D model
        </div>
      )}
    </div>
  );
};

export default ContactExperience;