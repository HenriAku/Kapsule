import Input from "./input.tsx";
import ButtonAdd from "./buttonAdd.tsx";

export const InputAndBtn = ({
	labelInput,
	type,
	nameInput,
	valueInput,
	placeholderInput,
	onChangeInput,
	disabledInput,
	requiredInput,
	onClickBtn,
	textBtn
}: {
	labelInput: string;
	type: string;
	nameInput: string;
	valueInput: string;
	placeholderInput: string;
	onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	disabledInput: boolean;
	requiredInput: boolean;
	onClickBtn: () => void;
	textBtn: string;
}) => {
	return (
		<div className="flex flex-col gap-2">
			<Input
				label={labelInput}
				type={type}
				name={nameInput}
				value={valueInput}
				placeholder={placeholderInput}
				onChange={onChangeInput}
				disabled={disabledInput}
				required={requiredInput}
			/>
			<ButtonAdd
				text={textBtn}
				onClick={onClickBtn}
			/>
		</div>
	);
};