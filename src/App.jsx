import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StartPage from './components/StartPage'
import GamePage from './components/GamePage'

function App() {
	const [GameStart, setGameStart] = useState(false)

	const StartGame = () => {
		console.log("Game irá iniciar!")
		setGameStart(true);
	}

	const ResetGame = () => {
		console.log("Game irá reiniciar!")
		setGameStart(false);
	}
	
	return (
		<div className='App'>

			{!GameStart ? (
				<StartPage className="start_page" Function={StartGame}></StartPage>
				) : (
				<GamePage Function={ResetGame}></GamePage>
				)
			}

		</div>
	)
}

export default App
