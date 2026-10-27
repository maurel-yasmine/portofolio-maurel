import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

interface LineWavesProps {
  className?: string;
  /** Three pastel colors used by the shader. */
  colors?: [string, string, string];
  /** Overall strength of the effect (0 – 1). */
  opacity?: number;
  /** How fast the waves drift. */
  speed?: number;
}

const VERTEX = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uOpacity;

varying vec2 vUv;

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = vec2((vUv.x - 0.5) * aspect, vUv.y - 0.5);
  float t = uTime;

  float wave = 0.0;
  wave += sin(p.x * 3.0 + t * 1.10) * 0.50;
  wave += sin(p.x * 5.5 - t * 0.85 + p.y * 2.0) * 0.30;
  wave += sin(p.y * 4.2 + t * 0.70) * 0.25;
  wave += sin((p.x + p.y) * 6.5 - t * 1.35) * 0.15;
  wave = clamp(wave * 0.5 + 0.5, 0.0, 1.0);

  vec3 color = mix(uColorA, uColorB, smoothstep(0.05, 0.95, wave));
  color = mix(color, uColorC, smoothstep(0.30, 0.95, vUv.y) * 0.55);

  float topFade = smoothstep(0.0, 0.40, vUv.y);
  float bottomFade = 1.0 - smoothstep(0.70, 1.0, vUv.y);
  float vignette = 1.0 - smoothstep(0.35, 1.25, length(p));

  float alpha = uOpacity * (0.28 + 0.72 * topFade * bottomFade) * (0.45 + 0.55 * vignette);

  gl_FragColor = vec4(color, alpha);
}
`;

const DEFAULT_COLORS: [string, string, string] = ["#e8a0b4", "#c9beea", "#f7d9e3"];

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((char) => char + char)
          .join("")
      : clean;
  const int = Number.parseInt(full, 16);
  if (Number.isNaN(int)) return [1, 1, 1];
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
}

/**
 * Soft animated pastel wave background rendered with a WebGL shader (ogl).
 * Fails silently on devices without WebGL.
 */
export function LineWaves({
  className = "",
  colors = DEFAULT_COLORS,
  opacity = 0.55,
  speed = 0.35,
}: LineWavesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const colorKey = colors.join("|");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        alpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
      });
    } catch {
      return;
    }

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";
    container.appendChild(gl.canvas);

    const [a, b, c] = colorKey.split("|");

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: VERTEX,
      fragment: FRAGMENT,
      transparent: true,
      depthTest: false,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [1, 1] },
        uColorA: { value: hexToRgb(a) },
        uColorB: { value: hexToRgb(b) },
        uColorC: { value: hexToRgb(c) },
        uOpacity: { value: opacity },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let frame = 0;
    let elapsed = 0;
    let last = performance.now();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const loop = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;
      if (!reduceMotion) {
        elapsed += delta * speed;
        program.uniforms.uTime.value = elapsed;
      }
      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      if (gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [colorKey, opacity, speed]);

  return <div ref={containerRef} aria-hidden="true" className={className} />;
}
