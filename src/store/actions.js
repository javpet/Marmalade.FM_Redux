const playMix = payload => ({
	type: "PLAY_MIX",
	currentMix: payload.currentMix,
	fromMixcloud: payload.fromMixcloud,
	playing: payload.playing
});

const addMix = payload => ({
	type: "ADD_MIX",
	payload
});

const setWidgetReady = payload => ({
	type: "SET_WIDGET_READY",
	payload
});

export default {
	playMix,
	addMix,
	setWidgetReady
};
