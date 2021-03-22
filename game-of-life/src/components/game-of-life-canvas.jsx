import React, { useEffect, useRef, useState } from 'react'

function GameOfLifeCanvas() {

  const canvasRef = useRef();

  const [squares, setSquares] = useState(() => {
    const initialState = getSquares();
    return initialState;
  });

  const SIZE = 10

  const NUMCOLUMNS = 50;
  const NUMROWS = 50;

  let STEP = 0;
  const INITIAL_SQUARE_COUNT = 500

  useEffect(() => {
    getSquares();
    setInitialAliveSquares();
    loop();
  })

  const loop = () => {
    setInterval(() => {
      STEP += 1;
      renderCanvas();
    }, 2000);
  }

  const setInitialAliveSquares = () => {
    squares.forEach(square => {
      const intialValue = getRandomInitialAliveSquares(2499, 500)
      const index = intialValue.findIndex(square.id);
      if (index > -1) square.alive = true;
    })
    setSquares(squares);
  }

  const getRandomInitialAliveSquares = (maxRange, totalNum) => {
    const initialAliveIds = [];
    for (let i = 0; i < totalNum; i++) {
      initialAliveIds.push(Math.floor(Math.random() * Math.floor(maxRange)))
    }
    return initialAliveIds;
  }

  const killSquare = square => {
    switch (square) {
      case squares[square.id].hasNeighbour():
      case squares[square.id]:
        square.alive = false;
        break;
    }
  }

  const renderCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');
    squares.forEach((square) => {
      ctx.save();
      const color = square.alive ? 'blue' : 'red';
      ctx.fillStyle = color;
      ctx.translate(square.row * SIZE, square.column * SIZE );
      ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.restore();
    })
  }

  const getSquares = () => {
    const squares = [];
    for (let i = 0; i < (NUMCOLUMNS * NUMROWS); i++ ) {
      const row = Math.floor(i / NUMROWS);
      const column = i - (Math.floor(i / NUMCOLUMNS) * NUMCOLUMNS);
      squares.push({
        id: i,
        alive: false,
        row,
        column
      })
    }
    setSquares(squares)
  }

  return (
    <canvas
      id="game-of-life-canvas"
      height={SIZE * NUMCOLUMNS}
      width={SIZE * NUMROWS}
      ref={canvasRef}
    ></canvas>
  );
}

export default GameOfLifeCanvas