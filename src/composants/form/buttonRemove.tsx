
"use client";

interface Props {
	onClick: (index: number) => void;
	index: number;
}

const ButtonRemove: React.FC<Props> = ({ onClick, index }) => {
	return (
		<button
			type="button"
			onClick={() => onClick(index)}
			className="text-red-600 hover:text-red-800 font-bold"
		>
			✕
		</button>
	);
};

export default ButtonRemove;