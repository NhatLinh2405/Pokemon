import { Detail, PokemonDetail } from "../interface";
import PokemonsList from "./PokemonsList";
import "./pokemon.css";

interface IProps {
	pokemons: PokemonDetail[];
	viewDetail: Detail;
	setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

export default function PokemonPage({ pokemons, viewDetail, setDetail }: IProps) {
	const selectPokemon = (id: number) => {
		if (!viewDetail.isOpened) {
			setDetail({
				id: id,
				isOpened: true,
			});
		}
	};
	return (
		<>
			<section className={viewDetail.isOpened ? "collection-container-active" : "collection-container"}>
				{viewDetail.isOpened ? <div className="overlay"></div> : false}
				{pokemons.map((p) => (
					<div className="" onClick={() => selectPokemon(p.id)}>
						<PokemonsList
							viewDetail={viewDetail}
							setDetail={setDetail}
							key={p.id}
							name={p.name}
							id={p.id}
							abilities={p.abilities}
							image={p.sprites.front_default}
						/>
					</div>
				))}
			</section>
		</>
	);
}
