const Pokemon = (() => {
    // Pass with ID(s) to get specific pokemon(s)
    async function getPokemon(ids) {
        try {
            if (Array.isArray(ids)) {
                const responses = [];
                while (ids.length > 0) {
                    const currentID = ids.pop();
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentID}`);
                    if (!response.ok) {
                        // If the API throws an error
                        // const errorInfo = await response.json();
                        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
                    }
                    responses.push(await response.json());
                }
                return responses;
            } else {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ids}`);
                return await response.json();
            }
        } catch (error) {
            // Both API and network errors are caught here
            return null;
        }
    }

    return { getPokemon };
})();

export default Pokemon;
