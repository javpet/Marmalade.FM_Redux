import React from "react";
import Stat from "./Stat";

class Show extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			mix: {}
		};
	}

	// We grab the mix that has a slug that matches our params from the url
	// componentWillReceiveProps runs every time the component receives new nextProps rather than just one like componentDidMount
	componentWillReceiveProps(nextProps) {
		const mixes = nextProps.mixes;
		const [firstMix = {}] = mixes.filter(mix => mix.slug === this.props.match.params.slug);

		if (firstMix) {
			this.setState({
				mix: firstMix
			});
		}
	}

	render() {
		const { match } = this.props;
		const { mix } = this.state;
		return (
			<div className="ph3 ph4-l pad-bottom">
				<div className="measure center lh-copy">
					<p>{mix.description}</p>
					<Stat statName="Plays..." statNumber={mix.play_count} statWord="times" />

					<Stat statName="Uploaded..." statNumber={mix.created_time} statWord="days ago" />

					<Stat statName="Lasting for..." statNumber={mix.audio_length / 60} statWord="minutes" />
				</div>
			</div>
		);
	}
}

export default Show;
