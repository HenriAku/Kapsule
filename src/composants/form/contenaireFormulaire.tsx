export const ContenaireFormulaire = ({ children, text }: { children: React.ReactNode; text: string }) => {
	return (
		<div className="flex flex-col gap-2 bg-white dark:bg-[#222146] p-5 rounded-2xl shadow-md">
			<h3 className="text-lg font-semibold text-black dark:text-white">
				{text}
			</h3>
			{children}
		</div>
	);
};