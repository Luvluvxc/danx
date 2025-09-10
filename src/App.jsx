"use client"

import { useState } from "react"
import "./App.css"

function App() {
  const [message, setMessage] = useState("")
  const [eggs, setEggs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [eggCount, setEggCount] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    setIsLoading(true)

    try {
      const response = await fetch("https://formspree.io/f/mldwznae", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message.trim(),
        }),
      })

      if (response.ok) {
        // Limpiar mensaje
        setMessage("")


				const containerWidth = 300; // o el ancho real de .eggs-container
				const containerHeight = 200;
        // Agregar nuevo huevo
        const newEgg = {
					id: Date.now(),
					x: Math.random() * containerWidth,
					y: Math.random() * containerHeight,
				};
        setEggs((prev) => [...prev, newEgg])
        setEggCount((prev) => prev + 1)

        // Mostrar celebración
        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 3000)
      }
    } catch (error) {
      console.error("Error sending message:", error)
      alert("Error enviando mensaje. Intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="App">
      {showCelebration && (
        <div className="celebration">
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
        </div>
      )}

      <div className="container">
        <h1 className="title">una gallina puso huevos.......ayer 🐒</h1>

        <div className="chicken-container">
					<img src="/chicken.jpeg" alt="Gallina feliz" className={`chicken ${showCelebration ? "chicken-happy" : ""}`} />
        </div>

        <p className="subtitle">esta gallina quiere poner huevos</p>
        <p className="instruction">manda un mensaje para ayudar a la gallina a poner huevos</p>

        <form onSubmit={handleSubmit} className="message-form">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            className="message-input"
            rows="4"
            required
          />
          <button type="submit" disabled={isLoading || !message.trim()} className="submit-button">
            {isLoading ? "Enviando..." : "Ayudar a la gallina 🐒"}
          </button>
        </form>

        <div className="stats">
          <p>Huevos puestos: {eggCount}</p>
        </div>

        <div className="eggs-container">
          {eggs.map((egg) => (
            <div
              key={egg.id}
              className="egg"
              style={{
                left: `${egg.x}px`,
    						top: `-50px`, // empieza arriba
              }}
            >
							🥚
							
            </div>
          ))}
				</div>
				
      </div>
    </div>
  )
}

export default App
