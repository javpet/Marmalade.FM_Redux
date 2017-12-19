import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import FeaturedMix from "./FeaturedMix";
import Header from "./Header";
import Home from "./Home";
import Archive from "./Archive";
import About from "./About";
import Show from "./Show";
import Player from "./Player";

// Import Reduxt
import { connect } from "react-redux";
import actions from "../store/actions";

// Import mix data
import mixesData from "../data/mixes";

class App extends Component {
	fetchMixes = async () => {
		const addMix = this.props.addMix;

		mixesData.map(async id => {
			fetch(`https://api.mixcloud.com/${id}`)
				.then(response => {
					if (response.status !== 200) {
						console.log("Looks like there was a problem. Status Code: " + response.status);
						return;
					}

					// Examine the text in the response
					response.json().then(data => addMix(data));
				})
				.catch(function(err) {
					console.log("Fetch Error :-S", err);
				});
		});
	};

	componentDidMount() {
		this.fetchMixes();
	}

	render() {
		const [firstMix = {}] = this.props.mixes;

		return (
			<Router>
				<div>
					<div className="flex-l justify-end">
						<FeaturedMix {...this.state} {...this.actions} {...firstMix} />
						<div className="w-50-l relative z-1">
							<Header />
							<Route exact path="/" component={Home} />
							<Route path="/archive" component={Archive} />
							<Route path="/about" component={About} />
							<Route path="/show/:slug" component={Show} />
						</div>
					</div>
					<Player />
				</div>
			</Router>
		);
	}
}

export default connect(state => state, actions)(App);
