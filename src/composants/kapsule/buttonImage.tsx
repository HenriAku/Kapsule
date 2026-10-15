interface Props {
	imageSrc: string;
	onClick: () => void;
	isFavorite?: boolean;
}

export const ButtonImage: React.FC<Props> = ({ imageSrc, onClick, isFavorite }) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className="btn-icon shrink-0"
		>
			<div
				className={`lg:w-7 lg:h-7 md:w-6 md:h-6 w-5 h-5 ${isFavorite ? "bg-yellow-400" : "bg-white"}`}
				style={{
					maskImage: `url('${imageSrc}')`,
					maskSize: "contain",
					maskRepeat: "no-repeat",
					maskPosition: "center",
					WebkitMaskImage: `url('${imageSrc}')`,
					WebkitMaskSize: "contain",
					WebkitMaskRepeat: "no-repeat",
					WebkitMaskPosition: "center",
				}}
			/>
		</button>
	);
};