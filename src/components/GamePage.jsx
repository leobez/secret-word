import React, { useState, useEffect, useRef } from 'react'
import styles from './GamePage.module.css'
import GameBoard from './GameBoard'
import VictoryScreen from './VictoryScreen'
import DefeatScreen from './DefeatScreen'

import {wordsList} from "../data/wordList"

const GamePage = ({Function}) => {

	const [wordList, setWordList] = useState(wordsList)

	const selectWord = () => {
		if (wordList.length <= 0) return;

		const randNumber = Math.floor(Math.random() * wordList.length)
		const wordSelected = wordList[randNumber]

		// Removendo a palavra selecionada do array
		setWordList((previousState) => previousState.filter(
			(word_obj) => wordSelected != word_obj
		))

		return wordSelected;
	}

	const [wordSelected			, setWordSelected] 			= useState(selectWord)
	const [letterCanBeSubmitted	, setLetterCanBeSubmitted] 	= useState(false)
	const [points				, setPoints] 				= useState(0)
	const [attempts				, setAttempts] 				= useState(3)
	const [letterTyped			, setLetterTyped] 			= useState("")
	const [lettersCache			, setLettersCache] 			= useState("")
	const [win					, setWin]					= useState(false)
	const [lose					, setLose]					= useState(false)
	const letterInputRef									= useRef(null)

	const handleChange = (event) => {
		const regex = /^([a-zA-Z])$/.test(event.target.value)
		setLetterCanBeSubmitted(regex)
		setLetterTyped(event.target.value)
	}

	useEffect(() => {
	  verifyWordCompleted()
	}, [lettersCache]);

	useEffect(() => {
		stillHasAttempts()
	  }, [attempts]);

	useEffect(() => {
		verifyListCompleted()
	}, [wordList]);

	const [forceRenderKey, setForceRenderKey] = useState(0);
	const forceRender = () => {
	  setForceRenderKey(prevKey => prevKey + 1);
	};
  
	const handleLetter = (indexes) => {
		document.getElementById("letter").value = ""

		for (let a=0; a<indexes.length; a++) {
			const letter_div = document.getElementById(`letter_container_${indexes[a]}`)
			letter_div.textContent = `${letterTyped.toUpperCase()}`
		} 

		// Adicionar letra na lista de letras usadas
		if (letterNotTypedYet()) {
			setLettersCache((previousState) => {
				return previousState + `${letterTyped.toLowerCase()}`
			})
		}

		letterInputRef.current.focus()
	}

	const letterNotTypedYet = () => {
		// Verificando se essa letra CORRETA ja foi achada
		for (let a=0; a<lettersCache.length; a++) {
			if (lettersCache[a].toLowerCase() === letterTyped.toLowerCase()) {
				return false
			}
		}
		return true
	}

	const decreasePoints = () => {
		setPoints((previousState) => {
			return previousState - 5
		})
	}

	const decreaseAttempts = () => {
		setAttempts((previousState) => {
			return previousState - 1
		})
	}

	const stillHasAttempts = () => {
		if (attempts <= 0) {
			setLose(true)
			return false
		}
		return true
	}

	const handleLetterSubmit = () => {
		const indexes_found = []
		for (let a=0; a<wordSelected.word.length; a++) {
			if (wordSelected.word[a].toLowerCase() === letterTyped.toLowerCase()) {
				if (letterNotTypedYet()) {
					indexes_found.push(a)
				}
			}
		}

		if (indexes_found.length <= 0) {
			decreasePoints()
			decreaseAttempts()
		}

		return handleLetter(indexes_found)
	}

	const increasePoints = () => {
		setPoints((previousState) => {
			return previousState + 50
		})
	}

	const resetCache = () => {
		setLettersCache("")
	}

	const resetAttempts = () => {
		setAttempts(3)
	}
	
	const changeWord = () => {
		setWordSelected(selectWord)
		forceRender()
	}

	const verifyWordCompleted = (trigger) => {

		if (trigger) {
			for (let a=0; a<wordSelected.word.length; a++) {
				if (!lettersCache.includes(wordSelected.word.toLowerCase().split("")[a])) {
					return false
				}
			}
			increasePoints()
			return true
		}

		for (let a=0; a<wordSelected.word.length; a++) {
			if (!lettersCache.includes(wordSelected.word.toLowerCase().split("")[a])) {
				return false
			}
		}

		// Se chegar aqui, é pq a palavra foi achada
		// Verificando se ainda tem palavra a serem achadas
		if (!verifyListCompleted()) {
			increasePoints()
			resetCache()
			resetAttempts()
			changeWord()
		}

		return true		
	}

	const verifyListCompleted = () => {
		if (wordList.length <= 0 && verifyWordCompleted(true)) {
			setWin(true)
			return true
		}
		return false
	}

	return (
		<div className={styles.game_page}>

			{/* PONTUAÇÃO */}
			<div>
				<span>Pontuação: {points}</span>
			</div>

			{/* ADVINHE A PALAVRA */}
			<div>
				<span>Advinhe a palavra:</span>
			</div>

			{/* DICA SOBRE A PALAVRA */}
			<div>
				<span>Dica sobre a palavra: {wordSelected.tip}</span>
			</div>

			{/* VOCE AINDA TEM X TENTATIVAS */}
			<div>
				<span>Tentativas restantes: {attempts}</span>
			</div>

			{/* JOGO */}
			<div className={styles.game_board_container}>
				<GameBoard word={wordSelected.word} key={forceRenderKey}></GameBoard>
			</div>

			<div className={styles.user_input_area}>
				{/* TENTE ADVINHAR UMA LETRA DA PALAVRA */}
				<div>
					<span>Tente advinhar uma letra da palavra:</span>
				</div>

				<div className={styles.user_input_input_area}>
					{/* CAIXA DE INPUT */}
					<input type="text" name="letter" id="letter" className={styles.letter_input} maxLength={1} onChange={handleChange} ref={letterInputRef}/>

					{/* BOTÃO DE JOGAR */}
					{
						(letterCanBeSubmitted && !lettersCache.includes(letterTyped)) ? 
						(<button className={styles.button_can_be} onClick={handleLetterSubmit}>JOGAR!</button>) 
						: 
						(<button className={styles.button_cannot_be}>JOGAR!</button>)
					}
				</div>

				{/* LETRAS JA UTILIZADAS */}
				<div className={styles.used_letters}>
					<span>
						Letras já utilizadas: 
						{lettersCache.split().map((letter, index) => (
							<span key={index}>{letter}</span>
						))}
					</span>
				</div>

			</div>

			<div className={styles.restart_button_container}>
				<button onClick={Function}>REINICIAR</button>
			</div>
			
			<div>

				{
				win && 
				<VictoryScreen pont={points}>
					<div className={styles.restart_button_container}>
						<button onClick={Function}>REINICIAR</button>
					</div>
				</VictoryScreen>
				}

				{
				lose && 
				<DefeatScreen pont={points}>
					<div className={styles.restart_button_container}>
						<button onClick={Function}>REINICIAR</button>
					</div>
				</DefeatScreen>
				}

			</div>

		</div>
	)
}

export default GamePage