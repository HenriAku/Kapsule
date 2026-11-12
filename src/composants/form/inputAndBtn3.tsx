import Input from "./input.tsx";
import ButtonAdd from "./buttonAdd.tsx";

export const InputAndBtn3 = ({
	labelInput1,
	labelInput2,
	labelInput3,
	type,
	nameInput1,
	nameInput2,
	nameInput3,
	valueInput1,
	valueInput2,
	valueInput3,
	placeholderInput1,
	placeholderInput2,
	placeholderInput3,
	onChangeInput1,
	onChangeInput2,
	onChangeInput3,
	disabledInput,
	requiredInput,
	onClickBtn,
	textBtn
}: {
	labelInput1: string;
	labelInput2: string;
	labelInput3: string;
	type: string;
	nameInput1: string;
	nameInput2: string;
	nameInput3: string;
	valueInput1: string;
	valueInput2: string;
	valueInput3: string;
	placeholderInput1: string;
	placeholderInput2: string;
	placeholderInput3: string;
	onChangeInput1: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeInput2: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeInput3: (e: React.ChangeEvent<HTMLInputElement>) => void;
	disabledInput: boolean;
	requiredInput: boolean;
	onClickBtn: () => void;
	textBtn: string;
}) => {
	return (
		<div className="flex flex-col gap-2">
			<Input
				label={labelInput1}
				type={type}
				name={nameInput1}
				value={valueInput1}
				placeholder={placeholderInput1}
				onChange={onChangeInput1}
				disabled={disabledInput}
				required={requiredInput}
			/>
            <Input
				label={labelInput2}
				type={type}
				name={nameInput2}
				value={valueInput2}
				placeholder={placeholderInput2}
				onChange={onChangeInput2}
				disabled={disabledInput}
				required={requiredInput}
			/>
            <Input
				label={labelInput3}
				type={type}
				name={nameInput3}
				value={valueInput3}
				placeholder={placeholderInput3}
				onChange={onChangeInput3}
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