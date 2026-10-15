"use client";

import { useEffect, useState } from "react";
import { KapsuleService } from "../../service/kapsuleService";

export function useFavorite(initialFavoriteState: boolean) {
	const [isFavorite, setIsFavorite] = useState<boolean>(initialFavoriteState);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setIsFavorite(initialFavoriteState);
	}, [initialFavoriteState]);

	const toggleFavorite = async (id: number) => {
		setLoading(true);
		try {
			const updatedKapsule = await KapsuleService.updateKapsuleFavorite(id);
			if (updatedKapsule) {
				setIsFavorite(updatedKapsule.favorite);
			}
		} catch (error) {
			console.error("Erreur lors de la mise à jour du favori :", error);
		} finally {
			setLoading(false);
		}
	};

	return { isFavorite, toggleFavorite, loading };
}
