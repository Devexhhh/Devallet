import { useEffect, useMemo, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { type Container, type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim"

export const ParticleNetwork = () => {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  const particlesLoaded = async (_container?: Container): Promise<void> => {}

  const options: ISourceOptions = useMemo(() => ({
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        grab: {
          distance: 160,
          links: { opacity: 0.5, color: "#c9a96e" },
        },
        push: { quantity: 2 },
      },
    },
    particles: {
      color: { value: "#c9a96e" },
      links: {
        color: "#c9a96e",
        distance: 160,
        enable: true,
        opacity: 0.12,
        width: 0.8,
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: { default: OutMode.out },
        random: true,
        speed: 0.5,
        straight: false,
      },
      number: {
        density: { enable: true },
        value: 55,
      },
      opacity: { value: 0.35 },
      shape: { type: "circle" },
      size: { value: { min: 0.5, max: 2 } },
    },
    detectRetina: true,
  }), [])

  if (!init) return null

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
      className="fixed inset-0 -z-10 pointer-events-auto"
    />
  )
}