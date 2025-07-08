import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

export function Computer(props) {
  const { nodes, materials } = useGLTF(
    "/models/computer-optimized-transformed.glb"
  );

  // Optimizar materiales una sola vez
  const optimizedMaterials = useMemo(() => {
    const computerMaterial = materials["ComputerDesk.001"];
    const floppyMaterial = materials["FloppyDisk.001"];
    
    // Optimizar materiales para móviles
    if (computerMaterial) {
      computerMaterial.roughness = 0.8;
      computerMaterial.metalness = 0.1;
      computerMaterial.envMapIntensity = 0.5;
      computerMaterial.needsUpdate = true;
    }
    
    if (floppyMaterial) {
      floppyMaterial.roughness = 0.8;
      floppyMaterial.metalness = 0.1;
      floppyMaterial.envMapIntensity = 0.5;
      floppyMaterial.needsUpdate = true;
    }
    
    return {
      computer: computerMaterial,
      floppy: floppyMaterial
    };
  }, [materials]);

  return (
    <group {...props} dispose={null} frustumCulled={true}>
      <group position={[-4.005, 67.549, 58.539]}>
        <mesh
          castShadow={false}
          receiveShadow={false}
          geometry={nodes.Cube000_ComputerDesk_0001_1.geometry}
          material={optimizedMaterials.computer}
          frustumCulled={true}
        />
        <mesh
          castShadow={false}
          receiveShadow={false}
          geometry={nodes.Cube000_ComputerDesk_0001_2.geometry}
          material={optimizedMaterials.floppy}
          frustumCulled={true}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/computer-optimized-transformed.glb");

export default Computer;