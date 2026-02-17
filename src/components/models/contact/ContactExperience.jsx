import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Html, OrbitControls } from "@react-three/drei";
import { useInView } from "react-intersection-observer";
import { Suspense, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import Computer from "./Computer";

const ContactExperience = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: "50px",
  });

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      const hardwareConcurrency = navigator.hardwareConcurrency ?? 8;
      const deviceMemory = navigator.deviceMemory ?? 8;
      setIsMobile(mobile);

      const isLowEnd =
        mobile &&
        (hardwareConcurrency < 4 ||
          deviceMemory < 4 ||
          /Android.*4\.|iPhone.*OS [4-9]_/.test(navigator.userAgent));
      setIsLowPerformance(isLowEnd);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const canvasConfig = useMemo(() => {
    if (isLowPerformance) {
      return {
        dpr: [0.55, 0.85],
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
      };
    }

    if (isMobile) {
      return {
        dpr: [0.7, 1.05],
        shadows: false,
        antialias: false,
        alpha: false,
        powerPreference: "default",
        failIfMajorPerformanceCaveat: false,
        stencil: false,
        depth: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
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
    };
  }, [isMobile, isLowPerformance]);

  const cameraConfig = useMemo(
    () => ({
      position: isMobile ? [0, 2.2, 5.2] : [0, 3, 7],
      fov: isMobile ? 50 : 45,
      near: 0.1,
      far: 100,
    }),
    [isMobile]
  );

  const lightConfig = useMemo(() => {
    if (isLowPerformance) {
      return {
        ambient: { intensity: 0.55, color: "#fff4e6" },
        directional: [{ position: [5, 5, 3], intensity: 1.0, color: "#ffd9b3" }],
      };
    }

    if (isMobile) {
      return {
        ambient: { intensity: 0.48, color: "#fff4e6" },
        directional: [{ position: [5, 5, 3], intensity: 1.15, color: "#ffd9b3" }],
      };
    }

    return {
      ambient: { intensity: 0.4, color: "#fff4e6" },
      directional: [
        { position: [5, 5, 3], intensity: 1.5, color: "#ffd9b3" },
        { position: [5, 9, 1], intensity: 1.5, color: "#ffd9b3" },
      ],
    };
  }, [isMobile, isLowPerformance]);

  const orbitControlsConfig = useMemo(
    () => ({
      enableZoom: false,
      enablePan: false,
      enableRotate: !isLowPerformance,
      enableDamping: !isLowPerformance,
      dampingFactor: isMobile ? 0.09 : 0.06,
      minPolarAngle: Math.PI / 5,
      maxPolarAngle: Math.PI / 2,
      autoRotate: false,
      rotateSpeed: isMobile ? 0.28 : 0.45,
      maxDistance: 15,
      minDistance: 3,
    }),
    [isMobile, isLowPerformance]
  );

  const modelScale = useMemo(() => {
    if (isLowPerformance) return 0.025;
    if (isMobile) return 0.028;
    return 0.03;
  }, [isMobile, isLowPerformance]);

  const LoadingFallback = () => (
    <Html center>
      <div
        style={{
          color: "#ffd9b3",
          fontSize: isMobile ? "14px" : "16px",
          fontWeight: "300",
          textAlign: "center",
          userSelect: "none",
        }}
      >
        Loading 3D Model...
      </div>
    </Html>
  );

  return (
    <div ref={ref} className="w-full h-full relative">
      {inView && (
        <Canvas
          dpr={canvasConfig.dpr}
          shadows={canvasConfig.shadows}
          camera={cameraConfig}
          gl={canvasConfig}
          frameloop="demand"
          performance={{ min: 0.15, max: 1, debounce: 200 }}
          onCreated={(state) => {
            state.gl.setClearColor("#000000", 0);
            state.gl.setPixelRatio(
              Math.min(window.devicePixelRatio, canvasConfig.dpr[1])
            );
            state.gl.outputColorSpace = THREE.SRGBColorSpace;
            state.gl.toneMapping = THREE.ACESFilmicToneMapping;
            state.gl.toneMappingExposure = isMobile ? 1.03 : 1.1;

            if (isMobile) {
              state.gl.precision = "mediump";
            }
          }}
        >
          <AdaptiveDpr pixelated />

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

          <group scale={[1, 1, 1]}>
            <mesh
              receiveShadow={false}
              position={[0, -1.5, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              frustumCulled={true}
            >
              <planeGeometry args={isMobile ? [20, 20] : [30, 30]} />
              <meshBasicMaterial color="#a46b2d" transparent={false} fog={false} />
            </mesh>
          </group>

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

      {!inView && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#ffd9b3",
            fontSize: "14px",
            opacity: 0.7,
          }}
        >
          Scroll to load 3D model
        </div>
      )}
    </div>
  );
};

export default ContactExperience;
