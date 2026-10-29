import { useState, useEffect } from 'react'
import './App.css'

const JUGADORES = { X: 'Quisqueya', O: 'Taíno' }

const LINEAS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

const CLAVE = 'tres-en-raya-rd'

function calcularGanador(casillas) {
  for (const [a, b, c] of LINEAS) {
    if (casillas[a] && casillas[a] === casillas[b] && casillas[a] === casillas[c]) {
      return { jugador: casillas[a], linea: [a, b, c] }
    }
  }
  return null
}

function cargarPartida() {
  try {
    const guardada = localStorage.getItem(CLAVE)
    if (guardada) return JSON.parse(guardada)
  } catch {
    return { casillas: Array(9).fill(null), turnoX: true }
  }
  return { casillas: Array(9).fill(null), turnoX: true }
}

function Casilla({ valor, onClick, ganadora, indice }) {
  const clases = ['casilla']
  if (valor) clases.push(valor === 'X' ? 'jugador-x' : 'jugador-o')
  if (ganadora) clases.push('ganadora')

  return (
    <button
      className={clases.join(' ')}
      onClick={onClick}
      aria-label={`Casilla ${indice + 1}${valor ? `, ${valor}` : ', vacía'}`}
    >
      {valor}
    </button>
  )
}

export default function App() {
  const [casillas, setCasillas] = useState(() => cargarPartida().casillas)
  const [turnoX, setTurnoX] = useState(() => cargarPartida().turnoX)

  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify({ casillas, turnoX }))
  }, [casillas, turnoX])

  const ganador = calcularGanador(casillas)
  const empate = !ganador && casillas.every(Boolean)

  function jugar(indice) {
    if (casillas[indice] || ganador) return

    const nuevas = [...casillas]
    nuevas[indice] = turnoX ? 'X' : 'O'
    setCasillas(nuevas)
    setTurnoX(!turnoX)
  }

  function reiniciar() {
    setCasillas(Array(9).fill(null))
    setTurnoX(true)
  }

  let mensaje
  if (ganador) {
    mensaje = `¡Qué lo qué! Ganó ${JUGADORES[ganador.jugador]} 🇩🇴`
  } else if (empate) {
    mensaje = '¡Empate! Ni pa\' ti ni pa\' mí 🤝'
  } else {
    mensaje = `Turno de ${JUGADORES[turnoX ? 'X' : 'O']} (${turnoX ? 'X' : 'O'})`
  }

  return (
    <div className="app">
      <h1>Tres en Raya 🇩🇴</h1>
      <h2>Quisqueya vs Taíno</h2>

      <p className={`mensaje ${ganador || empate ? 'final' : ''}`}>{mensaje}</p>

      <div className="tablero">
        {casillas.map((valor, i) => (
          <Casilla
            key={i}
            indice={i}
            valor={valor}
            ganadora={ganador ? ganador.linea.includes(i) : false}
            onClick={() => jugar(i)}
          />
        ))}
      </div>

      <button className="reiniciar" onClick={reiniciar}>
        Reiniciar
      </button>
    </div>
  )
}
