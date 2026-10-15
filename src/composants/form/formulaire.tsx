interface FormProps {
	children: React.ReactNode;
	onSubmit: (e: React.FormEvent) => void;
}

export default function Formulaire({
	children,
	onSubmit
}: FormProps) {

	return (
		<form
			onSubmit={onSubmit}
			className="w-full mt-7"
		>

			{children}

		</form>
	);
}