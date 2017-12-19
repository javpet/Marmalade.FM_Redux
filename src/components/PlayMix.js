import React from "react";

// Importing Redux
import { connect } from "react-redux";
import actions from "../store/actions";

// this component wraps around anything that when we click
// will start playing a mix for us. it provides us functioanlity
// rather than any design
const PlayMix = ({ playMix, currentMix, playing, children, className, id, fromMixcloud, className }) => (
	// when our currently playing mix equals the id of the mix
	// that this component refers to, we will add a class name
	// of 'playing'
	<div
		className={`${className} ${id === currentMix && playing && "playing"}`}
		onClick={() => playMix({ currentMix: id, fromMixcloud: false })}
	>
		{children}
	</div>
);

export default connect(state => state, actions)(PlayMix);
