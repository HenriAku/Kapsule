import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n";
import { ContenaireProvider } from "./context/context";
import {ThemeProvider} from "next-themes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider attribute="class" enableSystem defaultTheme="system">
			<ContenaireProvider>
				<App />
			</ContenaireProvider>
		</ThemeProvider>
	</React.StrictMode>,
);
