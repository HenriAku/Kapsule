"use client";

import { useState } from "react";
import { ApplicationsService } from "../../service/applicationService";
import { KapsuleService } from "../../service/kapsuleService";

export function useLancement() {
	const [loadingLancement, setLoading] = useState<boolean>(false);

	const toggleLancement = async (
		path_application: string[],
		option: string[],
		id: number
	) => {
		setLoading(true);
		try {
			await KapsuleService.updateKapsuleRecent(id);
			await ApplicationsService.lancerApplication(
				path_application,
				option,
			);
		} catch (error) {
			console.error("Erreur lors du lancement de la kapsule :", error);
		} finally {
			setLoading(false);
		}
	};

	return { toggleLancement, loadingLancement };
}
