"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function ThreeDChristmasTree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    // --- Scene Setup ---
    const container = containerRef.current;
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.background = null;

    // --- Camera Setup ---
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 9.8);

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // --- Lighting (Warm cozy pub matching) ---
    const ambientLight = new THREE.AmbientLight(0xffddbb, 0.45);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffea70, 1.4);
    mainLight.position.set(6, 12, 6);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    mainLight.shadow.bias = -0.001;
    scene.add(mainLight);

    // Flickering fireplace point light near bottom-front
    const firePointLight = new THREE.PointLight(0xff5500, 3.2, 8);
    firePointLight.position.set(0, -1.5, 2.5);
    scene.add(firePointLight);

    const backLight = new THREE.DirectionalLight(0xb91c1c, 1.3);
    backLight.position.set(-6, 4, -6);
    scene.add(backLight);

    const fillLight = new THREE.DirectionalLight(0x1a0f05, 0.6);
    fillLight.position.set(0, -6, 0);
    scene.add(fillLight);

    // --- Create Tree Group ---
    const treeGroup = new THREE.Group();
    // Shift group slightly to center it vertically without cropping the base
    treeGroup.position.y = -0.15;
    scene.add(treeGroup);

    // --- Tree Trunk (Doubled height to expose more wood) ---
    const trunkGeo = new THREE.CylinderGeometry(0.16, 0.22, 1.8, 12);
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x422613, // Rich warm wood brown
      roughness: 0.85,
      metalness: 0.05,
      flatShading: true,
    });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    // Sit from y = -2.2 (ground) up to y = -0.4 (inside tier 1)
    trunk.position.y = -1.3;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    treeGroup.add(trunk);

    // --- Custom Scalloped/Ruffled Tier Geometry Generator ---
    const createRuffledTierGeometry = (
      rTop: number,
      rBot: number,
      height: number,
      rufflesCount: number,
    ) => {
      const geo = new THREE.CylinderGeometry(rTop, rBot, height, 80, 20, false);
      const pos = geo.attributes.position;
      const tempV = new THREE.Vector3();

      for (let i = 0; i < pos.count; i++) {
        tempV.fromBufferAttribute(pos, i);

        const theta = Math.atan2(tempV.z, tempV.x);
        const yFraction = (height / 2 - tempV.y) / height;

        const ruffleAmp = 0.13 * yFraction;
        const rScale = 1.0 + ruffleAmp * Math.sin(theta * rufflesCount);

        tempV.x *= rScale;
        tempV.z *= rScale;

        if (yFraction > 0.8) {
          const pull = (yFraction - 0.8) / 0.2;
          const inwardFactor =
            1.0 - 0.16 * pull * (1.0 + 0.3 * Math.sin(theta * rufflesCount));
          tempV.x *= inwardFactor;
          tempV.z *= inwardFactor;

          tempV.y -=
            0.16 *
            Math.pow(pull, 2) *
            (1.0 + 0.4 * Math.sin(theta * rufflesCount));
        }

        pos.setXYZ(i, tempV.x, tempV.y, tempV.z);
      }

      geo.computeVertexNormals();
      return geo;
    };

    // --- Clay Tree Tiers (Shifted up to expose the wood trunk base) ---
    const tiersData = [
      { rTop: 0.75, rBot: 2.1, h: 1.1, y: -0.5, ruffles: 15, col: 0x0c3b1e },
      { rTop: 0.6, rBot: 1.75, h: 1.0, y: 0.3, ruffles: 14, col: 0x104b26 },
      { rTop: 0.48, rBot: 1.45, h: 0.9, y: 1.0, ruffles: 12, col: 0x145a2e },
      { rTop: 0.36, rBot: 1.15, h: 0.8, y: 1.6, ruffles: 10, col: 0x186b36 },
      { rTop: 0.24, rBot: 0.88, h: 0.7, y: 2.15, ruffles: 8, col: 0x1d7c3f },
      { rTop: 0.12, rBot: 0.62, h: 0.6, y: 2.65, ruffles: 6, col: 0x228e49 },
      { rTop: 0.0, rBot: 0.4, h: 0.5, y: 3.05, ruffles: 5, col: 0x2ea655 },
    ];

    const clayMaterials = tiersData.map(
      (t) =>
        new THREE.MeshStandardMaterial({
          color: t.col,
          roughness: 0.55,
          metalness: 0.1,
          flatShading: false,
        }),
    );

    const tierMeshes: THREE.Mesh[] = [];

    tiersData.forEach((tier, idx) => {
      const geo = createRuffledTierGeometry(
        tier.rTop,
        tier.rBot,
        tier.h,
        tier.ruffles,
      );
      const mesh = new THREE.Mesh(geo, clayMaterials[idx]);
      mesh.position.y = tier.y;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      treeGroup.add(mesh);
      tierMeshes.push(mesh);
    });

    // --- Puffy Extruded Golden Star ---
    const starShape = new THREE.Shape();
    const starPoints = 5;
    const outerRadius = 0.38;
    const innerRadius = 0.17;

    for (let i = 0; i < starPoints * 2; i++) {
      const angle = (i * Math.PI) / starPoints - Math.PI / 2;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const sx = Math.cos(angle) * radius;
      const sy = Math.sin(angle) * radius;
      if (i === 0) starShape.moveTo(sx, sy);
      else starShape.lineTo(sx, sy);
    }
    starShape.closePath();

    const starExtrudeSettings = {
      depth: 0.12,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.045,
      bevelThickness: 0.045,
    };

    const starGeo = new THREE.ExtrudeGeometry(starShape, starExtrudeSettings);
    starGeo.center();

    const starMat = new THREE.MeshStandardMaterial({
      color: 0xffea70,
      roughness: 0.25,
      metalness: 0.4,
      emissive: 0xffa200,
      emissiveIntensity: 0.5,
    });

    const star = new THREE.Mesh(starGeo, starMat);
    star.position.set(0, 3.4, 0); // At top of 7th tier
    star.castShadow = true;
    treeGroup.add(star);

    // --- Fairy Lights ---
    const lightsGroup = new THREE.Group();
    const lightGeo = new THREE.SphereGeometry(0.045, 8, 8);

    const lightColors = [0xffea88, 0xff6666, 0xffaa44, 0xaaffaa];

    const lightMats = lightColors.map((color) => {
      return {
        on: new THREE.MeshBasicMaterial({ color: color }),
        off: new THREE.MeshBasicMaterial({ color: 0x5a3d12 }),
      };
    });

    const fairyLights: {
      mesh: THREE.Mesh;
      phase: number;
      speed: number;
      matPair: any;
    }[] = [];

    tiersData.forEach((tier) => {
      const rBot = tier.rBot;
      const h = tier.h;
      const yBase = tier.y - h / 2;
      const count = tier.ruffles;

      for (let i = 0; i < count; i++) {
        const theta = (i / count) * Math.PI * 2;
        const yOffset = -0.16 * (1.0 + 0.4);
        const y = yBase + yOffset;

        const rScale = 1.0 + 0.14;
        const inwardFactor = 1.0 - 0.16 * (1.0 + 0.3);
        const currentR = rBot * rScale * inwardFactor;

        const x = Math.cos(theta) * currentR;
        const z = Math.sin(theta) * currentR;

        const matPair = lightMats[Math.floor(Math.random() * lightMats.length)];
        const lightMesh = new THREE.Mesh(lightGeo, matPair.on);
        lightMesh.position.set(x, y, z);
        lightsGroup.add(lightMesh);

        fairyLights.push({
          mesh: lightMesh,
          phase: Math.random() * Math.PI * 2,
          speed: 1.8 + Math.random() * 2,
          matPair: matPair,
        });
      }
    });
    treeGroup.add(lightsGroup);

    // --- Cozy Presents Placed on the Ground Base ---
    const giftGroup = new THREE.Group();
    // Aligned to sit flat on the ground plane (y = -2.2) matching base of trunk
    giftGroup.position.set(0, -2.2, 0);

    const giftConfigs = [
      {
        size: [0.55, 0.45, 0.55],
        pos: [-1.4, 0.225, 0.6],
        rot: [0, 0.5, 0],
        boxCol: 0xb91c1c,
        ribbonCol: 0xffd700,
      }, // Left Front
      {
        size: [0.45, 0.4, 0.45],
        pos: [1.4, 0.2, 0.7],
        rot: [0, -0.6, 0],
        boxCol: 0x663399,
        ribbonCol: 0xffd700,
      }, // Right Front
      {
        size: [0.38, 0.32, 0.38],
        pos: [-1.15, 0.16, -0.9],
        rot: [0, 0.15, 0],
        boxCol: 0xd4af37,
        ribbonCol: 0xb91c1c,
      }, // Left Back
      {
        size: [0.5, 0.5, 0.5],
        pos: [1.15, 0.25, -0.6],
        rot: [0, 0.75, 0],
        boxCol: 0x0c3b1e,
        ribbonCol: 0xfafafa,
      }, // Right Back
    ];

    const giftMeshes: THREE.Mesh[] = [];

    giftConfigs.forEach((cfg) => {
      const boxGeo = new THREE.BoxGeometry(
        cfg.size[0],
        cfg.size[1],
        cfg.size[2],
      );
      const boxMat = new THREE.MeshStandardMaterial({
        color: cfg.boxCol,
        roughness: 0.45,
        metalness: 0.1,
        flatShading: true,
      });
      const box = new THREE.Mesh(boxGeo, boxMat);
      box.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      box.rotation.set(cfg.rot[0], cfg.rot[1], cfg.rot[2]);
      box.castShadow = true;
      box.receiveShadow = true;

      box.userData = { originalY: cfg.pos[1], originalRotZ: cfg.rot[2] };

      giftGroup.add(box);
      giftMeshes.push(box);

      const ribbonThick = 0.06;
      const wrapGeoV = new THREE.BoxGeometry(
        ribbonThick,
        cfg.size[1] + 0.01,
        cfg.size[2] + 0.01,
      );
      const wrapGeoD = new THREE.BoxGeometry(
        cfg.size[0] + 0.01,
        cfg.size[1] + 0.01,
        ribbonThick,
      );
      const ribbonMat = new THREE.MeshStandardMaterial({
        color: cfg.ribbonCol,
        roughness: 0.3,
        metalness: 0.4,
      });

      const ribbon1 = new THREE.Mesh(wrapGeoV, ribbonMat);
      ribbon1.position.copy(box.position);
      ribbon1.rotation.copy(box.rotation);
      ribbon1.castShadow = true;
      giftGroup.add(ribbon1);

      const ribbon2 = new THREE.Mesh(wrapGeoD, ribbonMat);
      ribbon2.position.copy(box.position);
      ribbon2.rotation.copy(box.rotation);
      ribbon2.castShadow = true;
      giftGroup.add(ribbon2);

      box.userData.associatedRibbons = [ribbon1, ribbon2];
    });
    treeGroup.add(giftGroup);

    // --- Snow Particle Field ---
    const snowParticlesGeo = new THREE.BufferGeometry();
    const snowCount = 45;
    const snowCoords = new Float32Array(snowCount * 3);
    const snowSpeeds: number[] = [];

    for (let i = 0; i < snowCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 4.0;
      const x = Math.cos(angle) * radius;
      const y = Math.random() * 6.5 - 2;
      const z = Math.sin(angle) * radius;

      snowCoords[i * 3] = x;
      snowCoords[i * 3 + 1] = y;
      snowCoords[i * 3 + 2] = z;

      snowSpeeds.push(0.01 + Math.random() * 0.015);
    }

    snowParticlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(snowCoords, 3),
    );
    const snowMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.7,
    });
    const snowPoints = new THREE.Points(snowParticlesGeo, snowMat);
    scene.add(snowPoints);

    // --- Interactive Sparkles from Gifts ---
    const sparkles: {
      mesh: THREE.Mesh;
      velocity: THREE.Vector3;
      life: number;
      maxLife: number;
    }[] = [];
    const sparkleGeo = new THREE.SphereGeometry(0.05, 5, 5);
    const sparkleColors = [0xffd700, 0xffaa00, 0xffffff, 0xb91c1c];

    const triggerGiftSparkles = (boxMesh: THREE.Mesh) => {
      const ribbons = boxMesh.userData.associatedRibbons || [];

      gsap.killTweensOf([boxMesh.position, boxMesh.rotation]);
      ribbons.forEach((rib: THREE.Mesh) =>
        gsap.killTweensOf([rib.position, rib.rotation]),
      );

      const tl = gsap.timeline();
      tl.to([boxMesh.position, ...ribbons.map((r: any) => r.position)], {
        y: `+=${0.32}`,
        duration: 0.15,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });

      gsap.fromTo(
        [boxMesh.rotation, ...ribbons.map((r: any) => r.rotation)],
        { z: 0 },
        { z: 0.16, duration: 0.08, yoyo: true, repeat: 3, ease: "sine.inOut" },
      );

      const spawnPos = new THREE.Vector3()
        .copy(boxMesh.position)
        .add(giftGroup.position);
      for (let i = 0; i < 22; i++) {
        const sMat = new THREE.MeshBasicMaterial({
          color:
            sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
          transparent: true,
          opacity: 1.0,
        });
        const sMesh = new THREE.Mesh(sparkleGeo, sMat);
        sMesh.position
          .copy(spawnPos)
          .add(
            new THREE.Vector3(
              (Math.random() - 0.5) * 0.2,
              0.15,
              (Math.random() - 0.5) * 0.2,
            ),
          );

        scene.add(sMesh);

        const angle = Math.random() * Math.PI * 2;
        const spreadSpeed = 0.045 + Math.random() * 0.06;
        const velocity = new THREE.Vector3(
          Math.cos(angle) * spreadSpeed,
          0.065 + Math.random() * 0.11,
          Math.sin(angle) * spreadSpeed,
        );

        sparkles.push({
          mesh: sMesh,
          velocity: velocity,
          life: 0,
          maxLife: 25 + Math.random() * 20,
        });
      }
    };

    // --- Interaction Logic (Raycasting, Drag & Hover) ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let targetRotationY = 0;
    let targetRotationX = 0;
    let currentRotationY = 0;
    let currentRotationX = 0;

    let isMouseDown = false;
    let isHovering = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const handleCanvasMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const cx = e.clientX - (rect.left + rect.width / 2);
      const cy = e.clientY - (rect.top + rect.height / 2);

      const nx = cx / (rect.width / 2);
      const ny = -cy / (rect.height / 2);

      if (!isMouseDown) {
        isHovering = true;
        targetRotationY = nx * 1.35;
        targetRotationX = ny * 0.65;
      }
    };

    const handleCanvasMouseLeave = () => {
      isHovering = false;
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        isMouseDown = true;
        setIsDragging(true);
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;

        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(giftMeshes);
        if (intersects.length > 0) {
          triggerGiftSparkles(intersects[0].object as THREE.Mesh);
        }
      }
    };

    const handleMouseDragMove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      targetRotationY += deltaX * 0.015;
      targetRotationX += deltaY * 0.01;

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      setIsDragging(false);
    };

    const handleTouchStart = (e: TouchEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const touch = e.touches[0];
      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        isMouseDown = true;
        setIsDragging(true);
        previousMouseX = touch.clientX;
        previousMouseY = touch.clientY;

        mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(giftMeshes);
        if (intersects.length > 0) {
          triggerGiftSparkles(intersects[0].object as THREE.Mesh);
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isMouseDown) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - previousMouseX;
      const deltaY = touch.clientY - previousMouseY;

      targetRotationY += deltaX * 0.018;
      targetRotationX += deltaY * 0.012;

      previousMouseX = touch.clientX;
      previousMouseY = touch.clientY;
    };

    container.addEventListener("mousemove", handleCanvasMouseMove);
    container.addEventListener("mouseleave", handleCanvasMouseLeave);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseDragMove);
    window.addEventListener("mouseup", handleMouseUp);

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleMouseUp);

    // --- Animation loop ---
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Firelight flicker
      firePointLight.intensity =
        3.0 +
        Math.sin(elapsedTime * 14) * 0.45 +
        Math.cos(elapsedTime * 8) * 0.25;

      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;

      const clampedRotX = Math.max(-0.4, Math.min(0.4, currentRotationX));

      if (isMouseDown || isHovering) {
        treeGroup.rotation.y = currentRotationY;
        treeGroup.rotation.x = clampedRotX;
      } else {
        targetRotationY += (0 - targetRotationY) * 0.03;
        targetRotationX += (0 - targetRotationX) * 0.03;
        treeGroup.rotation.y = elapsedTime * 0.22 + currentRotationY;
        treeGroup.rotation.x = clampedRotX;
      }

      if (star) {
        star.rotation.y = elapsedTime * 0.4;
        star.position.y = 3.4 + Math.sin(elapsedTime * 1.5) * 0.03;
        const starEmissivePulse = 0.35 + Math.sin(elapsedTime * 2.2) * 0.15;
        (star.material as THREE.MeshStandardMaterial).emissiveIntensity =
          starEmissivePulse;
      }

      fairyLights.forEach((light) => {
        const val = Math.sin(elapsedTime * light.speed + light.phase);
        if (val > 0.1) {
          light.mesh.material = light.matPair.on;
        } else {
          light.mesh.material = light.matPair.off;
        }
      });

      const positions = snowPoints.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < snowCount; i++) {
        positions[i * 3 + 1] -= snowSpeeds[i];
        positions[i * 3] += Math.sin(elapsedTime + i) * 0.002;
        if (positions[i * 3 + 1] < -2.2) {
          positions[i * 3 + 1] = 4.0;
        }
      }
      snowPoints.geometry.attributes.position.needsUpdate = true;

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.life++;
        s.velocity.y -= 0.003;
        s.mesh.position.add(s.velocity);

        const ratio = 1 - s.life / s.maxLife;
        (s.mesh.material as THREE.MeshBasicMaterial).opacity = ratio;
        s.mesh.scale.setScalar(ratio);

        if (s.life >= s.maxLife) {
          scene.remove(s.mesh);
          s.mesh.geometry.dispose();
          (s.mesh.material as THREE.MeshBasicMaterial).dispose();
          sparkles.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || 360;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleCanvasMouseMove);
      container.removeEventListener("mouseleave", handleCanvasMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseDragMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
      cancelAnimationFrame(animationFrameId);

      sparkles.forEach((s) => {
        scene.remove(s.mesh);
        s.mesh.geometry.dispose();
        (s.mesh.material as THREE.MeshBasicMaterial).dispose();
      });

      scene.remove(treeGroup);
      scene.remove(snowPoints);
      snowParticlesGeo.dispose();
      snowMat.dispose();

      trunkGeo.dispose();
      trunkMat.dispose();

      clayMaterials.forEach((m) => m.dispose());
      tierMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
      });

      starGeo.dispose();
      starMat.dispose();

      lightGeo.dispose();
      lightMats.forEach((m) => {
        m.on.dispose();
        m.off.dispose();
      });

      giftGroup.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else if (mesh.material) {
          mesh.material.dispose();
        }
      });

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div
        ref={containerRef}
        className="w-full h-full min-h-[400px] sm:min-h-[500px] cursor-grab active:cursor-grabbing relative"
      />
    </div>
  );
}
