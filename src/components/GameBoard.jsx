import React, { useState } from 'react'

import styles from './GameBoard.module.css'

const GameBoard = ({word}) => {

	const wordList = () => {
		const list = []
		let c=0;
		for (let i=0; i < word.length; i++) {
			list.push({id: c, letter: `${word[i]}`})
			c++;
		}
		return list
	}
	const [wordInList, setWordInList] = useState(wordList)

	return (
		<div className={styles.game_board}>
			{wordInList.map((letter) => (
				<div key={letter.id} className={styles.letter_container} id={`letter_container_${letter.id}`}></div>
			))}
		</div>
  )
}

export default GameBoard