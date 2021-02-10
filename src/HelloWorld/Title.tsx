import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const Title: React.FC<{
	titleText: string;
	titleColor: string;
	transitionStart: number;
}> = ({titleText, titleColor, transitionStart}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();
	const text = titleText.split(' ').map((t) => ` ${t} `);
	const transform = interpolate(
		spring({
			frame: frame - transitionStart,
			fps: videoConfig.fps,
			config: {
				damping: 100,
				mass: 0.5,
			},
		}),
		[0, 1],
		[0, 300]
	);

	return (
		<h1
			style={{
				fontFamily: 'SF Pro Text, Helvetica, Arial',
				fontWeight: 'bold',
				fontSize: 100,
				textAlign: 'center',
				position: 'absolute',
				bottom: 460,
				width: '100%',
				transform: `translateY(${transform}px)`,
			}}
		>
			{text.map((t, i) => {
				return (
					<span
						key={t}
						style={{
							color: titleColor,
							marginLeft: 10,
							marginRight: 10,
							transform: `scale(${spring({
								fps: videoConfig.fps,
								frame: frame - i * 5,
								config: {
									damping: 100,
									stiffness: 200,
									mass: 0.5,
								},
							})})`,
							display: 'inline-block',
						}}
					>
						{t}
					</span>
				);
			})}
		</h1>
	);
};
