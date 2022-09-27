import { Detail } from "../interface";
import "./pokemon.css";
import { useState, useEffect } from "react";
interface IProps {
	viewDetail: Detail;
	setDetail: React.Dispatch<React.SetStateAction<Detail>>;
	abilities:
		| {
				name: string;
				ability: string;
		  }[]
		| undefined;
	name: string;
	id: number;
	image: string;
}

export default function PokemonsList({ name, id, image, abilities, viewDetail, setDetail }: IProps) {
	const [selected, setSelected] = useState<Boolean>(false);
	useEffect(() => {
		setSelected(id === viewDetail?.id);
	}, [viewDetail, id]);

	const closeDetail = () => {
		setDetail({
			id: 0,
			isOpened: false,
		});
	};
	return (
		<div className="">
			{selected ? (
				<section className="pokemon-list-detailed">
					<div className="detail-container">
						<p className="detail-close" onClick={closeDetail}>
							X
						</p>
						<div className="detail-info">
							<img src={image} alt="pokemon" className="detail-img" />
							<p className="detail-name">{name}</p>
						</div>
						<div className="detail-skill">
							<p className="detail-ability"> Ablities: </p>
							{abilities?.map((ab: any) => {
								return <div className=""> {ab.ability.name}</div>;
							})}
						</div>
					</div>
				</section>
			) : (
				<section className="pokemon-list-container">
					<p className="pokemon-name"> {name} </p>
					<img src={image} alt="pokemon" />
				</section>
			)}
		</div>
	);
}
