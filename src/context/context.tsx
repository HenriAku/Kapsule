"use client";

import {
	createContext,
	useState,
	useContext,
	ReactNode,
	Dispatch,
	SetStateAction,
} from "react";

// Types pour le contexte
interface ContenaireContextType {
	link: string;
	setLink: Dispatch<SetStateAction<string>>;
}

interface ContenaireProviderProps {
	children: ReactNode;
}

// Création du contexte avec un type précis
const ContenaireContext = createContext<ContenaireContextType | undefined>(
	undefined,
);

// Le Provider qui englobe l'application
export const ContenaireProvider = ({ children }: ContenaireProviderProps) => {
	const [link, setLink] = useState("Dashboard");

	return (
		<ContenaireContext.Provider value={{ link, setLink }}>
			{children}
		</ContenaireContext.Provider>
	);
};

// Hook personnalisé pour consommer le contexte
export const useContainer = () => {
	const context = useContext(ContenaireContext);
	if (!context) {
		throw new Error(
			"useContainer doit être utilisé à l'intérieur d'un ContenaireProvider",
		);
	}
	return context;
};
