import React, { useRef, useEffect } from 'react'

const SOUND_URL = "./public/Hecha Pa' Mí - Grupo Frontera.mp3"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  color: string
}

interface Firework {
  x: number
  y: number
  targetY: number
  particles: Particle[]
  exploded: boolean
  color: string
}

const Fireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const animationFrameIdRef = useRef<number | null>(null)
  const fireworksRef = useRef<Firework[]>([])

  const particlesPerFirework = 100

  const randomColor = () => `hsl(${Math.random() * 360}, 100%, 50%)`

  const startFireworks = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = window.innerWidth
    const height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const fireworks = fireworksRef.current

    const createFirework = () => {
      const x = Math.random() * width
      const targetY = Math.random() * height * 0.5 + height * 0.1
      const color = randomColor()
      fireworks.push({
        x,
        y: height,
        targetY,
        exploded: false,
        particles: [],
        color,
      })
    }

    const updateFireworks = () => {
      ctx.clearRect(0, 0, width, height)

      if (Math.random() < 0.03) createFirework()

      fireworks.forEach((fw) => {
        if (!fw.exploded) {
          fw.y -= 8
          if (fw.y <= fw.targetY) {
            fw.exploded = true
            for (let i = 0; i < particlesPerFirework; i++) {
              const angle = Math.random() * Math.PI * 2
              const speed = Math.random() * 6 + 2
              fw.particles.push({
                x: fw.x,
                y: fw.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                color: fw.color,
              })
            }
          }
        } else {
          fw.particles.forEach((p) => {
            p.x += p.vx
            p.y += p.vy
            p.vy += 0.05
            p.alpha -= 0.02
          })
          fw.particles = fw.particles.filter((p) => p.alpha > 0)
        }
      })

      fireworks.forEach((fw) => {
        if (!fw.exploded) {
          ctx.beginPath()
          ctx.arc(fw.x, fw.y, 3, 0, Math.PI * 2)
          ctx.fillStyle = fw.color
          ctx.fill()
        } else {
          fw.particles.forEach((p) => {
            ctx.globalAlpha = p.alpha
            ctx.beginPath()
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
            ctx.fillStyle = p.color
            ctx.fill()
          })
          ctx.globalAlpha = 1
        }
      })

      for (let i = fireworks.length - 1; i >= 0; i--) {
        if (fireworks[i].exploded && fireworks[i].particles.length === 0) {
          fireworks.splice(i, 1)
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(updateFireworks)
    }

    updateFireworks()
  }

  useEffect(() => {
    // Make audio loop indefinitely
    if (audioRef.current) {
      audioRef.current.loop = true
      audioRef.current.play().catch(() => {
        console.log('Autoplay blocked or failed.')
      })
    }

    startFireworks()

    // Cleanup on unmount
    return () => {
      if (animationFrameIdRef.current)
        cancelAnimationFrame(animationFrameIdRef.current)
      if (audioRef.current) audioRef.current.pause()
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
          background: 'transparent',
        }}
      />
      <button
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.5,
        }}
        disabled
      >
        <h4>I Love You!</h4>
      </button>
      <audio ref={audioRef} src={SOUND_URL} />
    </div>
  )
}

export default Fireworks
