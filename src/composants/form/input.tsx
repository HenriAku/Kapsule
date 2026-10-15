interface InputProps {
	label: string;
	type: string;
	name: string;
	value: string;
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean
	required?: boolean
}

export default function Input({
	label,
	type,
	name,
	value,
	placeholder,
	onChange,
	disabled,
	required
}: InputProps) {

	return (
		<div className="mb-5">

			<label className="block mb-1 text-black dark:text-white">
				{required && <span className="text-red-500">*</span>} {label}
			</label>

			<input
				type={type}
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				required={required}
				disabled={disabled}
				className="border rounded-4xl border-blue-900 hover:border-blue-800 w-full px-3 py-2 dark:bg-white text-black"
				min={0}
			/>

		</div>
	);
}
