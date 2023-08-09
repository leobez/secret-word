import React from 'react'
import './VictoryScreen.css'

const VictoryScreen = ({pont, children}) => {
	return (
		<div className='victory'>
			<span>
				Ganhou :)
			</span>

			<span>Pontuação: {pont}</span>

			<span>
				{children}
			</span>
		</div>
	)
}

export default VictoryScreen