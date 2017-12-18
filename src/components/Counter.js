import React from "react";
import CountUp from "react-countup";

const Counter = ({ start = 0, end, ...props }) => {
	return (
		<div className="f1 b orange mb0 biryani lh-1">
			<CountUp start={start} end={end} useEasing={true} useGrouping={true} separator="," />
		</div>
	);
};

export default Counter;
