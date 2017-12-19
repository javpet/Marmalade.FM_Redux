/*global Mixcloud*/

import React from "react";

// Importing Redux
import { connect } from "react-redux";
import actions from "../store/actions";

class Player extends React.Component {
	componentWillReceiveProps(nextProps) {
		if (!nextProps.widgetReady) {
			return;
		}

		if (nextProps.currentMix !== this.props.currentMix) {
			this.widget.load(nextProps.currentMix, true);
		} else if (!nextProps.fromMixcloud) {
			this.widget.togglePlay();
		}
	}

	mountAudio = async () => {
		const { playMix, setWidgetReady } = this.props;

		// When we use the this keyword on the widget, we make it accessible instantly everywhere inside the component
		this.widget = Mixcloud.PlayerWidget(this.player);
		await this.widget.ready;
		// await this.widget.play();

		setWidgetReady(true);

		// Using the Mixcloud widget we can detect if the song is on pause
		this.widget.events.pause.on(() => {
			playMix({
				isPlaying: false,
				fromMixcloud: true
			});
		});

		// Using the Mixcloud widget we can detect if the song is playing
		this.widget.events.play.on(() => {
			playMix({
				isPlaying: true,
				fromMixcloud: true
			});
		});
	};

	componentDidMount() {
		// when our app component is all loaded onto the page
		// our componentDidMount gets called and we can be sure
		// everything is ready, so we then run our mountAudio()
		// method
		this.mountAudio();
	}

	actions = {
		togglePlay: () => {
			this.widget.togglePlay();
		},

		playMix: mixName => {
			// if the mixname is the same as the currently playing one we want to pause that
			const currentMix = this.state.currentMix;
			if (mixName === currentMix) {
				// We add return to stop the program here, if that's the case
				return this.widget.togglePlay();
			}

			// load a new mix by its name and then
			// start playing it immediately
			this.widget.load(mixName, true);
			this.setState({
				currentMix: mixName
			});
		}
	};

	render() {
		return (
			<iframe
				className="player db fixed bottom-0 z-5"
				width="100%"
				height="60"
				src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2Fadambeyer%2Fdcr383-drumcode-radio-live-adam-beyer-live-from-drumcode-at-mandarine-park-buenos-aires%2F"
				frameBorder="0"
				ref={player => (this.player = player)}
			/>
		);
	}
}

export default connect(state => state, actions)(Player);
