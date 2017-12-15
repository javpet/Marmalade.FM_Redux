import React from "react";

const Stat = ({ statName, statNumber, statWord }) => {
	return (
		<div className="w-third tc pa3 ba bw2 b--light-gray" style={{ marginRight: -2 }}>
			<div className="f6 biryani ttu">{statName}</div>
			<div className="f5 b biryani-black ttu tracked">
				{statNumber} {statWord}
			</div>
		</div>
	);
};

const About = ({ mixes, ...props }) => {
	return (
		<div className="ph3 ph4-l">
			<div className="measure center lh-copy f4 ph3">
				<p className="mt0">Marmalade.fm features the latest and greatest in grooves, beats and world music.</p>
				<p>
					Whether you’re into hip hop, trip hop, classic jazz, fusion jazz, afro beat or break beat… we have
					you covered!
				</p>
				<div className="flex pt3">
					<Stat statName="Featuring" statNumber={mixes.length} statWord="mixes" />
					<Stat
						statName="Played..."
						statNumber={mixes.reduce((acc, currentValue) => acc + currentValue.play_count, 0)}
						statWord="times"
					/>
					<Stat
						statName="With..."
						statNumber={mixes.reduce((acc, currentValue) => {
							return acc + currentValue.audio_length;
						}, 0)}
						statWord="secs"
					/>
				</div>
			</div>
		</div>
	);
};

export default About;
