import React, { useRef, useMemo, useState, useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

export function Room(props) {
  const { nodes, materials } = useGLTF("/models/optimized-room.glb");
  const screensRef = useRef();
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    const hardwareConcurrency = navigator.hardwareConcurrency ?? 8;
    const deviceMemory = navigator.deviceMemory ?? 8;

    // Detectar dispositivos de muy bajo rendimiento
    const isLowEnd =
      mobile &&
      (hardwareConcurrency < 4 ||
        deviceMemory < 4 ||
        /Android.*[4-6]\.|iPhone.*OS [4-9]_/.test(navigator.userAgent));
    setIsLowPerformance(isLowEnd);
  }, []);

  // Hook estable: cargar una sola vez y decidir en materiales si se usa o no
  const matcapTexture = useTexture("/images/textures/mat1.png");

  useEffect(() => {
    if (!matcapTexture) return;
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    matcapTexture.anisotropy = 4;
    matcapTexture.needsUpdate = true;
  }, [matcapTexture]);

  // Materiales optimizados con memoización
  const optimizedMaterials = useMemo(() => {
    const baseConfig = {
      transparent: false,
      fog: false,
      dithering: false,
      precision: isLowPerformance ? "mediump" : "highp",
      flatShading: isLowPerformance,
    };

    // Materiales simplificados pero iluminados para mantener mejor calidad visual
    if (isLowPerformance) {
      return {
        curtain: new THREE.MeshLambertMaterial({ ...baseConfig, color: "#d90429" }),
        body: new THREE.MeshLambertMaterial({ ...baseConfig, map: matcapTexture, color: "#c08457" }),
        table: new THREE.MeshLambertMaterial({ ...baseConfig, color: "#582f0e" }),
        radiator: new THREE.MeshLambertMaterial({ ...baseConfig, color: "#f8fafc" }),
        comp: new THREE.MeshLambertMaterial({ ...baseConfig, color: "#e2e8f0" }),
        pillow: new THREE.MeshLambertMaterial({ ...baseConfig, color: "#8338ec" }),
        chair: new THREE.MeshLambertMaterial({ ...baseConfig, color: "#0f172a" }),
      };
    }

    if (isMobile) {
      return {
        curtain: new THREE.MeshLambertMaterial({ ...baseConfig, color: "#d90429" }),
        body: new THREE.MeshLambertMaterial({
          ...baseConfig,
          map: matcapTexture,
          envMapIntensity: 0.3,
        }),
        table: new THREE.MeshLambertMaterial({ ...baseConfig, color: "#582f0e" }),
        radiator: new THREE.MeshLambertMaterial({ ...baseConfig, color: "#fff" }),
        comp: new THREE.MeshLambertMaterial({ ...baseConfig, color: "#fff" }),
        pillow: new THREE.MeshLambertMaterial({ ...baseConfig, color: "#8338ec" }),
        chair: new THREE.MeshLambertMaterial({ ...baseConfig, color: "#000" }),
      };
    }

    return {
      curtain: new THREE.MeshPhongMaterial({ color: "#d90429" }),
      body: new THREE.MeshPhongMaterial({ map: matcapTexture }),
      table: new THREE.MeshPhongMaterial({ color: "#582f0e" }),
      radiator: new THREE.MeshPhongMaterial({ color: "#fff" }),
      comp: new THREE.MeshStandardMaterial({ color: "#fff" }),
      pillow: new THREE.MeshPhongMaterial({ color: "#8338ec" }),
      chair: new THREE.MeshPhongMaterial({ color: "#000" }),
    };
  }, [isMobile, isLowPerformance, matcapTexture]);

  const CriticalMeshes = useMemo(
    () => (
      <>
        <mesh geometry={nodes._________6_blinn1_0.geometry} material={optimizedMaterials.curtain} />
        <mesh geometry={nodes.body1_blinn1_0.geometry} material={optimizedMaterials.body} />
        <mesh geometry={nodes.cabin_blinn1_0.geometry} material={optimizedMaterials.table} />
        <mesh geometry={nodes.chair_body_blinn1_0.geometry} material={optimizedMaterials.chair} />
        <mesh geometry={nodes.comp_blinn1_0.geometry} material={optimizedMaterials.comp} />
        <mesh geometry={nodes.table_blinn1_0.geometry} material={optimizedMaterials.table} />
        <mesh geometry={nodes.pillows_blinn1_0.geometry} material={optimizedMaterials.pillow} />
      </>
    ),
    [optimizedMaterials, nodes]
  );

  const DetailMeshes = useMemo(() => {
    if (isLowPerformance) {
      // Mantener solo detalles esenciales para conservar forma y legibilidad
      return (
        <>
          <mesh geometry={nodes.keyboard_blinn1_0.geometry} material={materials.blinn1} />
          <mesh geometry={nodes.monitor2_blinn1_0.geometry} material={materials.blinn1} />
          <mesh geometry={nodes.monitor3_blinn1_0.geometry} material={materials.blinn1} />
          <mesh geometry={nodes.radiator_blinn1_0.geometry} material={optimizedMaterials.radiator} />
          <mesh geometry={nodes.window_blinn1_0.geometry} material={materials.blinn1} />
          <mesh geometry={nodes.window4_phong1_0.geometry} material={materials.phong1} />
        </>
      );
    }

    return (
      <>
        <mesh geometry={nodes.handls_blinn1_0.geometry} material={materials.blinn1} />
        <mesh geometry={nodes.keyboard_blinn1_0.geometry} material={materials.blinn1} />
        <mesh geometry={nodes.kovrik_blinn1_0.geometry} material={materials.blinn1} />
        <mesh geometry={nodes.lamp_bl_blinn1_0.geometry} material={materials.blinn1} />
        <mesh geometry={nodes.lamp_white_blinn1_0.geometry} material={materials.blinn1} />
        <mesh geometry={nodes.miuse_blinn1_0.geometry} material={materials.blinn1} />
        <mesh geometry={nodes.monitor2_blinn1_0.geometry} material={materials.blinn1} />
        <mesh geometry={nodes.monitor3_blinn1_0.geometry} material={materials.blinn1} />
        <mesh geometry={nodes.pCylinder5_blinn1_0.geometry} material={materials.blinn1} />
        <mesh geometry={nodes.polySurface53_blinn1_0.geometry} material={materials.blinn1} />
        <mesh geometry={nodes.radiator_blinn1_0.geometry} material={optimizedMaterials.radiator} />
        <mesh geometry={nodes.radiator_blinn1_0001.geometry} material={materials.blinn1} />
        <mesh geometry={nodes.railing_blinn1_0.geometry} material={materials.blinn1} />
        <mesh geometry={nodes.red_bttns_blinn1_0.geometry} material={materials.blinn1} />
        <mesh geometry={nodes.red_vac_blinn1_0.geometry} material={materials.blinn1} />
        <mesh geometry={nodes.stylus_blinn1_0.geometry} material={materials.blinn1} />
        <mesh geometry={nodes.tablet_blinn1_0.geometry} material={materials.blinn1} />
        <mesh geometry={nodes.triangle_blinn1_0.geometry} material={materials.blinn1} />
        <mesh geometry={nodes.vac_black_blinn1_0.geometry} material={materials.blinn1} />
        <mesh geometry={nodes.vacuum1_blinn1_0.geometry} material={materials.blinn1} />
        <mesh geometry={nodes.vacuumgrey_blinn1_0.geometry} material={materials.blinn1} />
        <mesh geometry={nodes.vires_blinn1_0.geometry} material={materials.blinn1} />
        <mesh geometry={nodes.window_blinn1_0.geometry} material={materials.blinn1} />
        <mesh geometry={nodes.window4_phong1_0.geometry} material={materials.phong1} />
      </>
    );
  }, [isLowPerformance, materials, optimizedMaterials, nodes]);

  return (
    <group {...props} dispose={null} frustumCulled={true}>
      {!isLowPerformance && (
        <mesh
          ref={screensRef}
          geometry={nodes.emis_lambert1_0.geometry}
          material={materials.lambert1}
          frustumCulled={true}
        />
      )}

      {CriticalMeshes}
      {DetailMeshes}
    </group>
  );
}

useGLTF.preload("/models/optimized-room.glb");
