import { Action } from 'redux'
import { RootState } from './store'

interface RecorderState {
	dateStart: string
}

// Constants
const START = 'recorder/start'
const STOP = 'recorder/stop'
type StartAction = Action<typeof START>
type StopAction = Action<typeof STOP>
type ActionTypes = StartAction | StopAction

// Actions
export const start = (): StartAction => ({ type: START })

export const stop = (): StopAction => ({ type: STOP })

export const selectRecorderState = (rootState: RootState) => rootState.recorder
export const selectDateStart = (rootState: RootState) =>
	selectRecorderState(rootState).dateStart

// Reducer
const initialState: RecorderState = {
	dateStart: '',
}

export default (state: RecorderState = initialState, action: ActionTypes) => {
	switch (action.type) {
		case START:
			return {
				...state,
				dateStart: new Date().toISOString(),
			}
		case STOP:
			return {
				...state,
				dateStart: '',
			}
		default:
			return state
	}
}
