import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { initVantaClouds2 } from '../../lib/vanta.clouds2';

export default function AnimatedBackground({ theme = 'light' }) {
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  useEffect(() => {
    if (!vantaRef.current) return;

    const isDark = theme === 'dark';

    // Configure volumetric 3D Cloud shader parameters tailored for Light & Dark modes
    const vantaConfig = {
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 2.5,
      speed: 0.65,
      backgroundColor: isDark ? 0x080b11 : 0xf8fafc,
      skyColor: isDark ? 0x0f1d32 : 0x7dd3fc,
      cloudColor: isDark ? 0x075985 : 0xc7dffc,
      lightColor: isDark ? 0x38bdf8 : 0xffffff
    };

    try {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
      vantaEffectRef.current = initVantaClouds2(vantaConfig);
    } catch (err) {
      console.warn('[PDS Sentinel] Vanta 3D WebGL initialization note:', err);
    }

    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 3D WebGL Volumetric Shader Container */}
      <div 
        ref={vantaRef} 
        className="absolute inset-0 w-full h-full opacity-45 dark:opacity-35 transition-opacity duration-700" 
      />

      {/* Subtle Precision Tactical Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)]"
      />
    </div>
  );
}

// Sync step: 245

// Sync step: 277

// Sync step: 326

// Sync step: 392
