import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Pokemon, Detail } from "./interface";
import Pokemons from "./components/Pokemons";
interface Pokemons {
	name: string;
	url: string;
}
function App() {
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
	const [nextUrl, setNextUrl] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const [viewDetail, setDetail] = useState<Detail>({
		id: 0,
		isOpened: false,
	});

	useEffect(() => {
		const getPokemons = async () => {
			const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=16&offset=16");
			setNextUrl(res.data.next);
			res.data.results.forEach(async (pokemon: Pokemons) => {
				const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
				setPokemons((p) => [...p, poke.data]);
				setLoading(false);
			});
		};
		getPokemons();
	}, []);

	const load = async () => {
		setLoading(true);
		let res = await axios.get(nextUrl);
		setNextUrl(res.data.next);
		res.data.results.forEach(async (pokemon: Pokemons) => {
			const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
			setPokemons((p) => [...p, poke.data]);
			setLoading(false);
		});
	};

	return (
		<div className="App">
			<div className="container">
				<header className="pokemon-header">Pokemon</header>
				<Pokemons pokemons={pokemons} viewDetail={viewDetail} setDetail={setDetail} />

				{!viewDetail.isOpened ? (
					<div className="btn">
						<button onClick={load}>{loading ? "Loading..." : "Load More"}</button>{" "}
					</div>
				) : (
					false
				)}
			</div>
		</div>
	);
}

export default App;
