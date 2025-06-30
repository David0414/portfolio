import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Suspense, useMemo } from "react";

import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  // Memoize the Room component to avoid unnecessary re-renders
  const MemoizedRoom = useMemo(() => <Room />, []);

  return (
    <Canvas
      dpr={isMobile ? 1 : window.devicePixelRatio}
      camera={{ position: [0, 0, 15], fov: 45 }}
      gl={{ preserveDrawingBuffer: false, powerPreference: "low-power" }}
    >
      <ambientLight intensity={0.2} color="#1a1a40" />
      <OrbitControls
        enablePan={false}
        enableZoom={!isTablet}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />
      <Suspense fallback={<span className="text-white">Cargando modelo...</span>}>
        {!isMobile && <HeroLights />}
        <Particles count={isMobile ? 20 : 50} />
        <group
          scale={isMobile ? 0.7 : 1}
          position={[0, -3.5, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          {MemoizedRoom}
        </group>
      </Suspense>
    </Canvas>

  );
};

export default HeroExperience;
