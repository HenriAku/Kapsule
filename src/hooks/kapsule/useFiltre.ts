"use client";

import { useState, useMemo } from "react";
import { Kapsule } from "../../service/kapsuleService";

export function useFiltre(kapsules: Kapsule[]) {
	const [selectedOption, setSelectedOption] = useState<string>("Tout");

	const kapsulesFiltrees = useMemo(() => {
		if (selectedOption === "Tout") {
			return kapsules;
		}
		if (selectedOption === "Fav") {
			return kapsules.filter((k) => k.favorite);
		}
		return kapsules.filter((k) => k.tag.includes(selectedOption));
	}, [selectedOption, kapsules]);

	return {
		selectedOption,
		setSelectedOption,
		kapsulesFiltrees,
	};
}
