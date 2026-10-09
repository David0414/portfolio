import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

const Computer = (props) => {
  const { scene } = useGLTF("/models/computer-optimized.glb");
  const model = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={model} {...props} dispose={null} />;
};

export default Computer;
