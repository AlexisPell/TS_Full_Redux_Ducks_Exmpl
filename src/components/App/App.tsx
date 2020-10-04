import React from 'react'
import './App.css'

import Recorder from './../recorder/index'
import Calendar from './../calendar/index'

function App() {
	return (
		<div className='App'>
			<h1>Recording app</h1>
			<Recorder />
			<Calendar />
		</div>
	)
}

export default App
