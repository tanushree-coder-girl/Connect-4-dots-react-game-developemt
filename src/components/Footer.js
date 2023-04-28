import React from 'react'
import { GAME_STATE_PLAYING } from '../Constants';

export default function Footer({ clickNewGameBtnHandler, clickSuggestBtnHandler, gameState }) {
  
  // 2nd way conditional rendering 
  const renderBtns = () => {
    if(gameState === GAME_STATE_PLAYING){
      return <button onClick={clickSuggestBtnHandler}>Suggest</button>
    }
    return <button onClick={clickNewGameBtnHandler}>New Game</button>
  }
  return (
    <div className='panel footer'>
      {/* 1 wayconditional rendering */}
      {/* {gameState === GAME_STATE_PLAYING && <button onClick={clickSuggestBtnHandler}>Suggest</button> } */}
      {/* {gameState !== GAME_STATE_PLAYING && <button onClick={clickNewGameBtnHandler}>New Game</button>} */}
      {renderBtns()}
    </div>
  )
}
