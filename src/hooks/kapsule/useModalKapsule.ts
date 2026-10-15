"use client";

import { useState } from "react";

export function useModalKapsule() {
	const [isOpenRemove, setIsOpenRemove] = useState<boolean>(false);
	const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);

	const toggleModalRemove = async () => {
		setIsOpenRemove(!isOpenRemove);
		console.log("ModalRemove toggled:", !isOpenRemove);
	};

	const toggleModalEdit = async () => {
		setIsOpenEdit(!isOpenEdit);
		console.log("ModalEdit toggled:", !isOpenEdit);
	};

	return { isOpenRemove, toggleModalRemove, isOpenEdit, toggleModalEdit };
}