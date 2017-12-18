import React from "react";
import PlayButton from "./PlayButton";
import PlayMix from "./PlayMix";
import { Link } from "react-router-dom";

// here we pick out our name prop, and then the rest of the props
// we pass on through
const Mix = props => (
	<div
		className="aspect-ratio aspect-ratio--3x4 pointer bg-black cover bg-center"
		style={{ backgroundImage: `url(${props.pictures.extra_large})` }}
	>
		<Link to={`/show/${props.slug}`}>
			<PlayMix {...props}>
				<div className="ph3 pv4 aspect-ratio--object mix-overlay">
					<div className="flex items-center relative z-2">
						<h1 className="f4 f3-l mv0 white ttu biryani pr2 lh-title">{props.name}</h1>
						<PlayButton />
					</div>
				</div>
			</PlayMix>
		</Link>
	</div>
);

export default Mix;
