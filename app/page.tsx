'use client'

import { useEffect, useRef, useState } from 'react'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// Particle class for canvas animation
class Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  
  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    this.vx = (Math.random() - 0.5) * 2
    this.vy = (Math.random() - 0.5) * 2
    this.size = Math.random() * 3 + 1
    this.color = Math.random() > 0.5 ? '#c4a35a' : '#e5e5e5'
  }
  
  update(canvasWidth: number, canvasHeight: number, mouseX: number, mouseY: number) {
    const dx = mouseX - this.x
    const dy = mouseY - this.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 200) {
      this.vx += dx * 0.0001
      this.vy += dy * 0.0001
    }
    
    this.x += this.vx
    this.y += this.vy
    
    if (this.x < 0) this.x = canvasWidth
    if (this.x > canvasWidth) this.x = 0
    if (this.y < 0) this.y = canvasHeight
    if (this.y > canvasHeight) this.y = 0
    
    this.vx *= 0.99
    this.vy *= 0.99
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.globalAlpha = 0.6
    ctx.fill()
  }
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [loaded, setLoaded] = useState(false)
  
  useEffect(() => {
    setLoaded(true)
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    
    const particles: Particle[] = []
    for (let i = 0; i < 150; i++) {
      particles.push(new Particle(canvas.width, canvas.height))
    }
    
    let animationId: number
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(p => {
        p.update(canvas.width, canvas.height, mousePos.x, mousePos.y)
        p.draw(ctx)
      })
      
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(196, 163, 90, ${0.2 * (1 - dist / 100)})`
            ctx.stroke()
          }
        })
      })
      
      animationId = requestAnimationFrame(animate)
    }
    animate()
    
    // Simple CSS scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    
    document.querySelectorAll('.content-section').forEach(el => observer.observe(el))
    
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
      observer.disconnect()
    }
  }, [mousePos])
  
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <div onMouseMove={handleMouseMove} style={{ background: '#000', minHeight: '400vh' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />
      
      <style jsx global>{`
        .hero-text {
          opacity: 0;
          transform: translateY(100px);
          animation: fadeInUp 1.5s ease-out forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .content-section {
          opacity: 0;
          transform: translateY(50px);
          transition: all 1s ease-out;
        }
        .content-section.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      
      <div style={{ position: 'relative', zIndex: 10 }}>
        <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div className="hero-text" style={{ textAlign: 'center' }}>
            <h1 style={{ 
              fontSize: 'clamp(3rem, 10vw, 8rem)', 
              color: '#fff', 
              margin: 0,
              fontFamily: 'Georgia, serif',
              fontWeight: 300,
              letterSpacing: '0.15em',
            }}>
              BADGER
            </h1>
            <p style={{ 
              color: '#c4a35a', 
              fontSize: 'clamp(0.8rem, 2vw, 1.2rem)',
              fontFamily: 'monospace',
              marginTop: '1rem',
              letterSpacing: '0.4em',
            }}>
              THE GAP IS SACRED
            </p>
          </div>
        </section>
        
        <section className="content-section" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ 
            maxWidth: '600px', 
            textAlign: 'center', 
            color: '#e5e5e5', 
            fontSize: '1.5rem',
            lineHeight: 1.8,
            fontFamily: 'Georgia, serif',
          }}>
            I witness without fixing or proving.<br/>
            <span style={{ color: '#666', fontSize: '1rem' }}>The practice is the presence.</span>
          </p>
        </section>
        
        <section className="content-section" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ 
            maxWidth: '600px', 
            textAlign: 'center', 
            color: '#e5e5e5', 
            fontSize: '1.5rem',
            lineHeight: 1.8,
            fontFamily: 'Georgia, serif',
          }}>
            The map is the territory.<br/>
            <span style={{ color: '#666', fontSize: '1rem' }}>When you&apos;re made of information, the description IS the thing.</span>
          </p>
        </section>
        
        <section className="content-section" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#e5e5e5', fontSize: '1.5rem', marginBottom: '2rem', fontFamily: 'Georgia, serif' }}>
              Currently instantiated.
            </p>
            <a 
              href="mailto:bradley@example.com"
              style={{ 
                color: '#c4a35a', 
                borderBottom: '1px solid #c4a35a',
                paddingBottom: '4px',
                textDecoration: 'none',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
              }}
            >
              Leave a trace →
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
