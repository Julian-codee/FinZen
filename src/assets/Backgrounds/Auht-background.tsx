"use client"

import { useEffect, useRef } from "react"
import { m, motion } from "framer-motion"

interface AuthBackgroundProps {
  mode: "login" | "register"
  theme: "dark" | "light"
}

export function AuthBackground({ mode, theme }: AuthBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    

    let animationFrameId: number

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height        
        this.size = Math.random() * 3 + 2
        this.speedX = Math.random() * 1 - 0.25
        this.speedY = Math.random() * 1 - 0.25

        const colors =
          theme === "dark"
            ? mode === "login"
              ? ["rgba(59, 130, 246,", "rgba(99, 102, 241,", "rgba(139, 92, 246,"]
              : ["rgba(236, 72, 153,", "rgba(217, 70, 239,", "rgba(139, 92, 246,"]
            : mode === "login"
              ? ["rgba(37, 99, 235,", "rgba(79, 70, 229,", "rgba(124, 58, 237,"]
              : ["rgba(219, 39, 119,", "rgba(192, 38, 211,", "rgba(124, 58, 237,"]

        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.opacity = theme === "dark" ? Math.random() * 0.5 + 0.1 : Math.random() * 0.3 + 0.05
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `${this.color}${this.opacity})` // Ensamblado correcto del rgba
        ctx.fill()
      }
    }

    const particlesArray: Particle[] = []
    const isMobile = window.innerWidth < 768
    const numberOfParticles = isMobile
      ? Math.floor((canvas.width * canvas.height) / 20000)
      : Math.floor((canvas.width * canvas.height) / 10000)

    for (let i = 0; i < Math.min(100, numberOfParticles); i++) {
      particlesArray.push(new Particle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = theme === "dark" ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x
          const dy = particlesArray[i].y - particlesArray[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
            ctx.stroke()
          }
        }
      }

      for (const p of particlesArray) {
        p.update()
        p.draw()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)
    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mode, theme])

  const gradientClass =
    theme === "dark"
      ? mode === "login"
        ? "from-slate-950 via-slate-900 to-indigo-950"
        : "from-slate-950 via-slate-900 to-purple-950"
      : mode === "login"
        ? "from-slate-100 via-white to-indigo-100"
        : "from-pink-50 via-white to-purple-100"

  const orbColors =
    theme === "dark"
      ? mode === "login"
        ? ["bg-blue-500/10", "bg-indigo-500/10", "bg-purple-500/10"]
        : ["bg-pink-500/10", "bg-fuchsia-500/10", "bg-purple-500/10"]
      : mode === "login"
        ? ["bg-blue-300/30", "bg-indigo-300/30", "bg-purple-300/30"]
        : ["bg-pink-300/30", "bg-fuchsia-300/30", "bg-purple-300/30"]

  return (
    <>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} transition-colors duration-1000`} />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <motion.div
          className={`absolute top-1/4 -left-20 w-80 h-80 rounded-full blur-3xl transition-colors duration-1000 ${orbColors[0]}`}
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className={`absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-3xl transition-colors duration-1000 ${orbColors[1]}`}
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className={`absolute top-1/2 left-1/2 w-72 h-72 rounded-full blur-3xl transition-colors duration-1000 ${orbColors[2]}`}
          animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
    </>
  )
}
