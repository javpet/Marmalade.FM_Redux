import React from "react";
import Stat from "./Stat";

const About = ({ mixes, ...props }) => {
	return (
		<div className="measure center">
			<div className="lh-copy mb4">
				<p className="mt0">Marmalade.fm features the latest and greatest in grooves, beats and world music.</p>
				<p>
					Whether you’re into hip hop, trip hop, classic jazz, fusion jazz, afro beat or break beat… we have
					you covered!
				</p>
				<div className="">
					<Stat statName="Featuring..." statNumber={mixes.length} statWord="mixes" />
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
						statWord="seconds"
					/>
				</div>
			</div>
		</div>
	);
};

export default About;
