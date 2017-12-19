const initialState = {
	mixes: [],
	currentMix: null,
	widgetReady: false,
	playing: false
};

function mixesApp(state = initialState, action) {
	switch (action.type) {
		case "PLAY_MIX":
			return {
				...state,
				...action.payload,
				playing: action.payload.currentMix === state.currentMix ? !action.payload.playing : action.playing
			};

		case "ADD_MIX":
			return {
				...state,
				mixes: [...state.mixes, { ...action.payload, id: action.payload.key }]
			};

		case "SET_WIDGET_READY":
			return {
				...state,
				widgetReady: true
			};

		default:
			return state;
	}
}

export default mixesApp;
