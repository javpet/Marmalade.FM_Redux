/*global Mixcloud*/
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import FeaturedMix from "./FeaturedMix";
import Header from "./Header";
import Home from "./Home";
import Archive from "./Archive";
import About from "./About";

// Import mix data
import mixesData from "../data/mixes";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isPlaying: false,
			currentMix: "",
			mixIds: mixesData,
			mix: null,
			mixes: []
		};
	}

	fetchMixes = async () => {
		const mixIds = this.state.mixIds;

		mixIds.map(async id => {
			fetch(`https://api.mixcloud.com/${id}`)
				.then(response => {
					if (response.status !== 200) {
						console.log("Looks like there was a problem. Status Code: " + response.status);
						return;
					}

					// Examine the text in the response
					response.json().then(data => {
						this.setState((prevState, props) => ({
							mixes: [...prevState.mixes, data]
						}));
					});
				})
				.catch(function(err) {
					console.log("Fetch Error :-S", err);
				});
		});
	};

	mountAudio = async () => {
		// When we use the this keyword on the widget, we make it accessible instantly everywhere inside the component
		this.widget = Mixcloud.PlayerWidget(this.player);
		await this.widget.ready;
		// await this.widget.play();

		// Using the Mixcloud widget we can detect if the song is on pause
		this.widget.events.pause.on(() => {
			this.setState({
				isPlaying: false
			});
		});

		// Using the Mixcloud widget we can detect if the song is playing
		this.widget.events.play.on(() => {
			this.setState({
				isPlaying: true
			});
		});
	};

	componentDidMount() {
		// when our app component is all loaded onto the page
		// our componentDidMount gets called and we can be sure
		// everything is ready, so we then run our mountAudio()
		// method
		this.mountAudio();
		this.fetchMixes();
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
		const [firstMix = {}] = this.state.mixes;

		return (
			<Router>
				<div>
					<div className="flex-l justify-end">
						<FeaturedMix {...this.state} {...this.actions} {...firstMix} />
						<div className="w-50-l relative z-1">
							<Header />
							<Route
								exact
								path="/"
								component={() => <Home {...this.state} {...this.actions} id={firstMix.key} />}
							/>
							<Route path="/archive" render={() => <Archive {...this.actions} {...this.state} />} />
							<Route path="/about" render={() => <About {...this.state} />} />
						</div>
					</div>
					<iframe
						className="player db fixed bottom-0 z-5"
						width="100%"
						height="60"
						src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2Fadambeyer%2Fdcr383-drumcode-radio-live-adam-beyer-live-from-drumcode-at-mandarine-park-buenos-aires%2F"
						frameBorder="0"
						ref={player => (this.player = player)}
					/>
				</div>
			</Router>
		);
	}
}

export default App;
