import React, { useState, useEffect } from 'react'
import GameCircle from './GameCircle'
import Header from './Header'
import Footer from './Footer'
import { NO_PLAYER, PLAYER_1, PLAYER_2, NO_OF_CIRCLES, GAME_STATE_PLAYING, GAME_STATE_WIN, GAME_STATE_DRAW } from '../Constants';
import { isWinner, isDraw, getComputerMove  } from '../helper';

export default function GameBoard() {
  const [gameBoard, setGameBoard] = useState(Array(NO_OF_CIRCLES).fill(NO_PLAYER))
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
  const [winPlayer, setWinPlayer] = useState(NO_PLAYER);

  useEffect(() => {
    resetGame();
  }, []);

  // Init board 
  const init_board = () => {
    let circles = [];
    for (let i = 0; i < NO_OF_CIRCLES; i++){
      circles.push(renderCircle(i))
    }
    return circles
  }

  // reset Game or init game
  const resetGame = () => {
    setGameBoard(Array(NO_OF_CIRCLES).fill(NO_PLAYER))
    setCurrentPlayer(PLAYER_1);
    setGameState(GAME_STATE_PLAYING);
    setWinPlayer(NO_PLAYER);
  }

  // on circle click
  const onCircleClickHandler = (id) => {
    // const board = [...gameBoard]
    // board[id] = 1;
    // board[id] = currentPlayer;
    // setGameBoard(board);

    // prevent double clicking on circles
    if (gameBoard[id] !== NO_PLAYER) return;

    // prevents clicking on circle after winner declared
    if (gameState !== GAME_STATE_PLAYING) return;

    if (isWinner(gameBoard, id, currentPlayer)){
      // console.log('winnigg')
      setGameState(GAME_STATE_WIN)
      setWinPlayer(currentPlayer)
    }

    if (isDraw(gameBoard, id, currentPlayer)) {
      setGameState(GAME_STATE_DRAW)
      setWinPlayer(NO_PLAYER)
    }

    setGameBoard((prev)=>{
      return prev.map((circle, index)=>{
        if (index === id) return currentPlayer 
        return circle
      })
    })

    // Set Current player
    setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1)
  }

  // show component gameCircle
  const renderCircle = (index) => {
    return <GameCircle key={index} id={index} dynamicClasses={`player_${gameBoard[index]}`} onCircleClickHandler={onCircleClickHandler} />
  }

  // New Game Btn handler
  const clickNewGameBtnHandler = () => {
    resetGame();
  }

  // suggestion handler
  const clickSuggestBtnHandler = () => {
    onCircleClickHandler(getComputerMove(gameBoard));
  }

  return (
    <>
      <Header currentPlayer={currentPlayer} gameState={gameState} winPlayer={winPlayer} />
      <div className='gameboard'>
        {/* {
          gameBoard.map((data, index)=>(
            <GameCircle key={index} id={index} dynamicClasses={`player_${gameBoard[index]}`} onCircleClickHandler={onCircleClickHandler} />
          ))
        } */}

        {init_board()}
      </div>
      <Footer clickSuggestBtnHandler={clickSuggestBtnHandler} clickNewGameBtnHandler={clickNewGameBtnHandler} gameState={gameState} />
    </>
  )
}
