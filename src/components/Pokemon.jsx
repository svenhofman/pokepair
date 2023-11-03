const Pokemon = (() => {
    // Pass with ID(s) to get specific pokemon(s)
    async function getPokemon(ids) {
        if (Array.isArray(ids)) {
            const responses = [];
            while (ids.length > 0) {
                const currentID = ids.pop();
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentID}`);
                responses.push(await response.json());
            }
            return responses;
        } else {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ids}`);
            return await response.json();
        }
    }

    return { getPokemon };
})();

export default Pokemon;
