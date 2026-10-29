# Tres en Raya 🇩🇴

Michael Angelo Herrera Made 100412177

## Descripción del juego

Es el juego clásico Tres en Raya hecho con React. Juegan dos jugadores, Quisqueya (X) y Taíno (O), y se turnan para marcar el tablero de 3x3. El juego dice quién ganó, avisa si hay empate y tiene un botón para reiniciar. Tiene colores de la bandera dominicana, y la partida se guarda en el navegador aunque recargues la página.

## Qué aprendí

Con los videos de Fazt Code y de midudev aprendí lo básico de React:

- Qué es React y para qué sirve.
- Qué es un componente: dividí el juego en `App` y `Casilla`.
- Qué es JSX, que es escribir HTML dentro de JavaScript.
- Cómo pasar datos de un componente a otro con props.
- Cómo usar `useState` para guardar el tablero y el turno, y cómo cambiarlos.
- Cómo usar `useEffect` y `localStorage` para guardar la partida.
- Cómo detectar un ganador revisando las 8 combinaciones posibles.

## Qué parte fue más difícil

La parte más difícil fue entender cómo funciona el estado con `useState`, porque hay que hacer una copia del arreglo del tablero y no cambiarlo directamente. También me costó entender cuándo se ejecuta `useEffect`.