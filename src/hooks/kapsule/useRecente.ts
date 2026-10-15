"use client";

import { useEffect, useState } from "react";
import { Kapsule } from "../../service/kapsuleService";

export function useRecente(kapsules: Kapsule[]) {
	const [recents, setRecents] = useState<Kapsule | null>(null);

	useEffect(() => {
		for (let i = 0; i < kapsules.length; i++) {
			console.log("Kapsule activée trouvée :", kapsules[i]);
			if (kapsules[i].activation === true) {
				setRecents(kapsules[i]);
				break;
			}
		}
	}, [kapsules]);

	return { recents };
}
