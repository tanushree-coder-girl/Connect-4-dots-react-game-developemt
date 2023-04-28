import React from 'react'

export default function GameCircle({ id, onCircleClickHandler, dynamicClasses }) {
  return (
    <div className={`gamecicle ${dynamicClasses}`} onClick={() => onCircleClickHandler(id)}></div>
  )
}
