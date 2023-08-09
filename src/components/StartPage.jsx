import React from 'react'
import Title from './Title'
import styles from './StartPage.module.css'

const StartPage = ({Function}) => {
	
	const AppTitle = [ 
		{id: 1, letter: "S", color: "red"},
		{id: 2, letter: "E", color: "blue"},
		{id: 3, letter: "C", color: "blue"},
		{id: 4, letter: "R", color: "red"},
		{id: 5, letter: "E", color: "blue"},
		{id: 6, letter: "T", color: "red"},
		{id: 7, letter: "W", color: "red"},
		{id: 8, letter: "O", color: "blue"},
		{id: 9, letter: "R", color: "blue"},
		{id: 10, letter: "D", color: "red"}
	]
	
	return (
	<div className={styles.start_page_main}>

		<div className={styles.title_container}>
			<div className={styles.first_title}>
				{AppTitle.map((letter) => (
					letter.id <= 6 && <Title letter={letter.letter} key={letter.id} color_a={letter.color}></Title>
				))}
			</div>

			<div className={styles.second_title}>
				{AppTitle.map((letter) => (
					letter.id > 6 && <Title letter={letter.letter} key={letter.id} color_a={letter.color}></Title>
				))}
			</div>
		</div>
		
		<div className={styles.page_description}>
			<span>Descubra as palavras secretas!</span>			
		</div> 

		<div className={styles.button_container}>
			<button onClick={Function}>START</button>
		</div>

	</div>
  )
}

export default StartPage