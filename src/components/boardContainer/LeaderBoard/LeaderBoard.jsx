import React from 'react';
import style from './LeaderBoard.module.css'


export default function LeaderBord(props) {

  var winners = props.winners.map(winner => {

return <li className={style.li} key={winner.id}><span className={style.winner}>{winner.winner}</span> <span className={style.date}>{winner.date}</span></li>
  })


  return (
    <div className={style.LeadersList}>
      <h1>Leader Board</h1>
      <ul className={style.list}>
        {winners}
      </ul>

    </div>
  )
}