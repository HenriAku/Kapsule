"use client";

import { useEffect, useState, useCallback } from "react";
import { KapsuleService, Kapsule } from "../../service/kapsuleService";

export function useKapsules() {
	const [kapsules, setKapsules] = useState<Kapsule[]>([]);

	const refetch = useCallback(async () => {
		try {
			const data = await KapsuleService.getToutesLesKapsules();
			setKapsules(data);
		}
		catch (error) {
			console.error(
				"Erreur lors de la récupération des kapsules :",
				error,
			);
		}
	}, []);

	useEffect(() => {
		refetch();
	}, [refetch]);

	return { kapsules, refetch };
}
