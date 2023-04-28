import React from 'react'
import { GAME_STATE_PLAYING, GAME_STATE_WIN, GAME_STATE_DRAW } from '../Constants';

export default function Header({ currentPlayer, gameState, winPlayer }) {
  const renderLabel = () => {
    switch (gameState) {
      case GAME_STATE_PLAYING:
        return <div> Player-{currentPlayer} Turn </div> 
        break;
      case GAME_STATE_WIN: 
        return <div> Player-{winPlayer} Wins </div> 
        break;
      case GAME_STATE_DRAW:
        return <div> Game is Draw!</div>
        break;
      default:
        break;
    }
  }

  return (
    <div className='panel header'>
      <div className="header-text">
        {renderLabel()}
      </div>
    </div>
  )
}
