import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useInView } from "react-intersection-observer";
import { Suspense } from "react";
import Computer from "./Computer";

const ContactExperience = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // se monta una sola vez cuando entra en pantalla
    threshold: 0.1,     // porcentaje visible del elemento para activarse
  });

  return (
    <div ref={ref} className="w-full h-full">
      {inView && (
        <Canvas
          dpr={[1, 1.5]} // limita la resolución para mejorar fluidez
          shadows={false}
          camera={{ position: [0, 3, 7], fov: 45 }}
          gl={{ antialias: false }} // elimina suavizado para mejorar performance
        >
          <ambientLight intensity={0.4} color="#fff4e6" />
          <directionalLight position={[5, 5, 3]} intensity={1.5} color="#ffd9b3" />
          <directionalLight position={[5, 9, 1]} intensity={1.5} color="#ffd9b3" />

          <OrbitControls
            enableZoom={false}
            minPolarAngle={Math.PI / 5}
            maxPolarAngle={Math.PI / 2}
          />

          <group scale={[1, 1, 1]}>
            <mesh
              receiveShadow
              position={[0, -1.5, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[30, 30]} />
              <meshStandardMaterial color="#a46b2d" />
            </mesh>
          </group>

          <Suspense fallback={null}>
            <group scale={0.03} position={[0, -1.49, -2]} castShadow>
              <Computer />
            </group>
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default ContactExperience;
