import React from 'react'
import './DefeatScreen.css'

const DefeatScreen = ({pont, children}) => {

	return (
		<div className='defeat'>
			<span>
				Perdeu :(
			</span>

			<span>Pontuação: {pont}</span>

			<span>
				{children}
			</span>
		</div>
	)
}

export default DefeatScreen