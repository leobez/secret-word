import React from 'react'
import styles from "./Title.module.css"


const Title = ({letter, color_a}) => {

	return (
		<>
			<span style={{ backgroundColor: `${color_a}`}} className={styles.title_letter}>
				{letter}
			</span>
		</>
	)
}

export default Title