import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from './store'
import axios, { AxiosResponse } from 'axios'

export interface UserEvent {
	id: number
	title: string
	dateStart: string
	dateEnd: string
}

interface UserEventsState {
	byIds: Record<UserEvent['id'], UserEvent>
	allIds: UserEvent['id'][]
}

// Constants
export const LOAD_REQUEST = 'users/loadRequest'
type LoadRequestAction = Action<typeof LOAD_REQUEST>
export const LOAD_SUCCESS = 'users/loadSuccess'
interface LoadSuccessAction extends Action<typeof LOAD_SUCCESS> {
	payload: { events: UserEvent[] }
}
export const LOAD_FAIL = 'users/loadFail'
interface LoadFailAction extends Action<typeof LOAD_FAIL> {
	error: string
}

// Actions
export const loadUserEvents = (): ThunkAction<
	void,
	RootState,
	undefined,
	LoadRequestAction | LoadSuccessAction | LoadFailAction
> => async (dispatch, getState) => {
	dispatch({
		type: LOAD_REQUEST,
	})

	try {
		const res: AxiosResponse<UserEvent[]> = await axios.get(
			'http://localhost:3001/events'
		)
		const events = res.data

		dispatch({
			type: LOAD_SUCCESS,
			payload: { events },
		})
	} catch (err) {
		dispatch({ type: LOAD_FAIL, error: 'Failed to load events...' })
	}
}

// Func-helper for connect dispatch
export const selectUserEventsArray = (rootState: RootState) => {
	const state = rootState.users
	return state.allIds.map((id) => state.byIds[id])
}

// Reducer
const initialState: UserEventsState = {
	byIds: {},
	allIds: [],
}

type ActionTypes = LoadRequestAction | LoadSuccessAction | LoadFailAction

export default (state: UserEventsState = initialState, action: ActionTypes) => {
	switch (action.type) {
		case LOAD_SUCCESS:
			const { events } = action.payload
			return {
				...state,
				allIds: events.map(({ id }) => id),
				byIds: events.reduce<UserEventsState['byIds']>((byIds, event) => {
					byIds[event.id] = event
					return byIds
				}, {}),
			}
		default:
			return state
	}
}
