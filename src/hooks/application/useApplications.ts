"use client";

import { useEffect, useState } from "react";
import { ApplicationsService, Application } from "../../service/applicationService";

export function useApplications() 
{
	const [applications, setApplications] = useState<Application[]>([]);

	useEffect(() => {
		ApplicationsService.getToutesLesApplications()
			.then((data) => {
				setApplications(data);
			})
			.catch((error) => {
				console.error("Erreur lors de la récupération des applications :", error);
			});
	}, []);

	return { applications };
}
