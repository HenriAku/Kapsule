"use client";

import { useEffect, useState } from "react";
import { Kapsule } from "../../service/kapsuleService";

export function useTagList(kapsules: Kapsule[]) {
	const [loadingTag, setLoading] = useState<boolean>(false);
	const [tagList, setTagList] = useState<string[]>([]);

	useEffect(() => {
		setLoading(true);
		try {
			const tag = kapsules.flatMap((k) => k.tag);
			const listeUnique: string[] = [...new Set(tag)];
			setTagList(listeUnique);
		} catch (error) {
			console.error("Erreur lors de la recherche de tags :", error);
		} finally {
			setLoading(false);
		}
	}, [kapsules]);

	return { loadingTag, tagList };
}
