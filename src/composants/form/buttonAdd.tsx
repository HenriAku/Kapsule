
"use client";

interface Props {
	text?: string;
	onClick: () => void;
}

const ButtonAdd: React.FC<Props> = ({ text, onClick }) => {
	return (
		<div className="flex flex-row justify-end items-center">
			<button
				type="button"
				onClick={onClick}
				className="bg-blue-800 box-border border border-transparent 
							hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium 
							shadow-xs font-bold leading-5 rounded-full text-sm 
							px-4 py-2.5 focus:outline-none text-white hover:bg-blue-500"
			>
				{text}
			</button>
		</div>
	);
};

export default ButtonAdd;