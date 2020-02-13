import React from 'react'
import './GameLeader.css'

export default function LeaderBord (props) {
  var winners = props.winners.map(winner => {
    return <li className='leaderBoard__item' key={winner.id}><span className='leaderBoard__winner'>{winner.winner}</span> <span className='leaderBoard__date'>{winner.date}</span></li>
  })

  return (
    <div className="leaderBoard">
      <h1>Leader Board</h1>
      <ul className="leadersList">
        {winners}
      </ul>

    </div>
  )
}
