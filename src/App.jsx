import { useState } from 'react'
import './App.css'
import StartPage from './components/StartPage'
import GamePage from './components/GamePage'

function App() {
	const [GameStart, setGameStart] = useState(false)

	const StartGame = () => {
		setGameStart(true);
	}

	const ResetGame = () => {
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
