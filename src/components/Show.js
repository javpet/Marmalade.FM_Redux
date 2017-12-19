import React from "react";
import Stat from "./Stat";

// Import Redux
import { connect } from "react-redux";

// Importing date-fns
import differenceInDays from "date-fns/difference_in_days";

const Tag = ({ name, url }) => {
	return (
		<div className="mr2 b2 o-70">
			<a className="block f6 link blue b ba bw1 b--blue br2 pv1 ph2 lh-title" href={url} target="_blank">
				{name}
			</a>
		</div>
	);
};

const Tags = ({ tags = [] }) => {
	return (
		<div className="tags flex flex-wrap">
			{tags.map(tag => {
				return <Tag {...tag} />;
			})}
		</div>
	);
};

const Show = ({ mix }) => {
	return (
		<div className="ph3 ph4-l pad-bottom">
			<div className="measure center lh-copy">
				<Tags tags={mix.tags} />
				<p>{mix.description}</p>
				<Stat statName="Plays..." statNumber={mix.play_count} statWord="times" />

				<Stat
					statName="Uploaded..."
					statNumber={differenceInDays(new Date(), mix.created_time)}
					statWord="days ago"
				/>

				<Stat statName="Lasting for..." statNumber={mix.audio_length / 60} statWord="minutes" />
			</div>
		</div>
	);
};

const getMix = (mixes, slug) => {
	const [mix = {}] = mixes.filter(mix => mix.slug === slug);
	return mix;
};

export default connect((state, props) => ({
	mix: getMix(state.mixes, props.match.params.slug)
}))(Show);
