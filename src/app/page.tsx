async function getBulbasaur() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur');
  const bulbasaur = await res.json();

  return bulbasaur;
}

export default async function Home() {
  const bulbasaur = await getBulbasaur();

  return <h1>{bulbasaur.name}</h1>;
}
