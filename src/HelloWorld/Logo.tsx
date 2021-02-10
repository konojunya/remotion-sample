import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Arc} from './Arc';
import {Atom} from './Atom';

export const Logo: React.FC = () => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

	const development = spring({
		config: {
			damping: 100,
			mass: 0.5,
		},
		fps: videoConfig.fps,
		frame,
	});

	const rotationDevelopment = spring({
		config: {
			damping: 100,
			mass: 0.5,
		},
		fps: videoConfig.fps,
		frame,
	});

	const scaleIn = spring({
		frame,
		config: {
			mass: 0.5,
		},
		fps: videoConfig.fps,
	});

	const scale = frame < 50 ? scaleIn : 1;

	const logoRotation = interpolate(
		frame,
		[0, videoConfig.durationInFrames],
		[0, 360]
	);

	return (
		<div
			style={{
				position: 'absolute',
				top: -150,
				width: videoConfig.width,
				height: videoConfig.height,
				transform: `scale(${scale}) rotate(${logoRotation}deg)`,
			}}
		>
			<Arc
				rotateProgress={rotationDevelopment}
				progress={development}
				rotation={30}
			/>
			<Arc
				rotateProgress={rotationDevelopment}
				rotation={90}
				progress={development}
			/>
			<Arc
				rotateProgress={rotationDevelopment}
				rotation={-30}
				progress={development}
			/>
			<Atom scale={rotationDevelopment} />
		</div>
	);
};
