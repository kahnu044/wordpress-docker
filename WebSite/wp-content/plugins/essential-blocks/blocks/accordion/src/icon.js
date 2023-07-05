const AccordionIcon = () => {
	return (
		<svg
			width="256"
			height="256"
			viewBox="0 0 256 256"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<linearGradient
					x1="50%"
					y1="-8.333%"
					x2="50%"
					y2="108.44%"
					id="linearGradient-1"
				>
					<stop stopColor="#6DC7FF" offset="0%" />
					<stop stopColor="#E6ABFF" offset="100%" />
				</linearGradient>
				<linearGradient
					x1="50%"
					y1="-.962%"
					x2="50%"
					y2="102.035%"
					id="linearGradient-2"
				>
					<stop stopColor="#1A6DFF" offset="0%" />
					<stop stopColor="#C822FF" offset="100%" />
				</linearGradient>
			</defs>
			<g id="Page-1" fill="none" fillRule="evenodd">
				<g id="eb-icon-accordion">
					<path
						d="M128,0 C91.9749264,0 59.4418701,14.8956537 36.1835498,38.8488312 L203.514459,38.8488312 L203.514459,119.749264 L0.277056277,119.749264 C0.103064935,122.478823 0,125.227221 0,128 C0,130.065732 0.0664935065,132.11484 0.164017316,134.15619 L203.514459,134.15619 L203.514459,215.056623 L34.1732294,215.056623 C57.5468052,240.239931 90.9309784,256 128,256 C198.692571,256 256,198.692571 256,128 C256,57.3074286 198.692571,0 128,0 Z"
						id="Path"
						fill="url(#linearGradient-1)"
					/>
					<polygon
						id="Path"
						fill="url(#linearGradient-2)"
						fillRule="nonzero"
						points="186.891082 74.2621645 171.979913 74.2621645 171.979913 59.3509957 160.797922 59.3509957 160.797922 74.2621645 145.886753 74.2621645 145.886753 85.4441558 160.797922 85.4441558 160.797922 100.355325 171.979913 100.355325 171.979913 85.4441558 186.891082 85.4441558"
					/>
					<rect
						id="Rectangle"
						fill="url(#linearGradient-2)"
						fillRule="nonzero"
						x="145.887"
						y="169.015"
						width="41.004"
						height="11.183"
					/>
					<path
						d="M128.155152,67.662684 L15.0929177,67.662684 C10.9747532,75.3537662 7.62015584,83.5147359 5.12775758,92.0436364 L128.155152,92.0436364 L128.155152,67.662684 Z"
						id="Path"
						fill="#E5E5E5"
					/>
					<path
						d="M128.155152,162.415931 L4.68668398,162.415931 C7.05939394,170.933749 10.2887619,179.09361 14.2805887,186.796883 L128.155152,186.796883 L128.155152,162.415931 Z"
						id="Path"
						fill="#E5E5E5"
					/>
				</g>
			</g>
		</svg>
	);
};

export default AccordionIcon;
