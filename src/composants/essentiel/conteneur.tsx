export const Conteneur = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="min-h-[calc(100vh-40px)] bg-[#F8FAFC] dark:bg-[#171633] text-slate-100 m-2 
					sm:m-5 rounded-3xl sm:rounded-4xl flex flex-col lg:flex-row gap-6">
			{children}
		</div>
	);
};