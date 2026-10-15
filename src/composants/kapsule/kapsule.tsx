import { useFavorite } from "../../hooks/kapsule/useFavorite";
import { useLancement } from "../../hooks/application/useLancement";
import { ButtonImage } from "./buttonImage";
import { Kapsule as KapsuleType } from "../../service/kapsuleService";
import { useModalKapsule } from "../../hooks/kapsule/useModalKapsule";
import { ModalRemove } from "./modalRemove";
import { ModalEdit } from "./modalEdit";

export const Kapsule = ({
	Kapsule,
	seule,
	onRefresh,
}: {
	Kapsule: KapsuleType;
	seule: boolean;
	onRefresh: () => void;
}) => {
	const { isFavorite, toggleFavorite } = useFavorite(Kapsule.favorite);
	const { isOpenRemove, toggleModalRemove, isOpenEdit, toggleModalEdit } = useModalKapsule();
	const { toggleLancement } = useLancement();
	const nbApplications = Kapsule.application.length;

	return (
		<div>
			<div
				className={`bg-[#262378] dark:bg-[#262378] dark:border-2 dark:border-[#3B37AD]
							text-white flex flex-col pl-5 pr-5 pb-2 pt-2 my-3 hover:scale-[1.03] transition-transform duration-300
							rounded-3xl sm:rounded-4xl w-10/11 ${seule ? "md:max-w-xl" : ""}`}
			>
				<div className="flex flex-row justify-between items-center mb-3">
					<h3 className="lg:text-2xl md:text-xl sm:text-lg text-base overflow-hidden whitespace-nowrap text-ellipsis">
						{Kapsule.name}
					</h3>
					<div className="flex flex-row items-center gap-2">
						<ButtonImage
							imageSrc="/images/favorite.svg"
							onClick={async () => 
								{
									await toggleFavorite(Kapsule.id);
									onRefresh();
								}
							}
							isFavorite={isFavorite}
						/>
						<ButtonImage
							imageSrc="/images/pen.svg"
							onClick={toggleModalEdit}
						/>
						<ButtonImage
							imageSrc="/images/bin.svg"
							onClick={toggleModalRemove}
						/>
					</div>
				</div>

				<div className="mt-1 flex flex-row justify-between items-center">
					<div className="flex flex-row items-center gap-3 flex-wrap overflow-hidden text-gray-200">
						<p className="lg:text-md md:text-base sm:text-sm text-xs font-normal shrink-0">
							{nbApplications > 1
								? `${nbApplications} apps`
								: `${nbApplications} app`}
						</p>
						{Array.from({ length: Kapsule.tag.length }, (_, i) => (
							<div className="flex flex-row items-center text-center shrink-0 bg-blue-600 rounded-full">
								<p
									className="lg:text-md md:text-base sm:text-sm text-xs font-normal p-1 pr-2"
									key={i}
								>
									#{Kapsule.tag[i]}
								</p>
							</div>
						))}
					</div>

					<ButtonImage
						imageSrc="/images/play.svg"
						onClick={async () =>
							{
								await toggleLancement(
									Kapsule.path_application,
									Kapsule.option,
									Kapsule.id
								);
								onRefresh();
							}
						}
					/>
				</div>
			</div>
			{isOpenRemove && (
				<ModalRemove
					id={Kapsule.id}
					isOpen={isOpenRemove}
					onClose={toggleModalRemove}
					onRefresh={onRefresh}
				/>
			)}
			{isOpenEdit && (
				<ModalEdit
					kapsule={Kapsule}
					isOpen={isOpenEdit}
					onClose={toggleModalEdit}
					onRefresh={onRefresh}
				/>
			)}
		</div>
	);
};
