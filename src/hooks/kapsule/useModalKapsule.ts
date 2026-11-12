"use client";

import { useState } from "react";

export function useModalKapsule() {
	const [isOpenRemove, setIsOpenRemove] = useState<boolean>(false);
	const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
	const [isOpenShortCut, setIsOpenShortCut] = useState<boolean>(false);

	const toggleModalRemove = async () => {
		setIsOpenRemove(!isOpenRemove);
	};

	const toggleModalEdit = async () => {
		setIsOpenEdit(!isOpenEdit);
	};

	const toggleModalShortCut = async () => {
		setIsOpenShortCut(!isOpenShortCut);
	};

	return { isOpenRemove, toggleModalRemove, isOpenEdit, toggleModalEdit, isOpenShortCut, toggleModalShortCut };
}