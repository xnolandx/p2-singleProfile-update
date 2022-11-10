const HeroSearch = (query) => {
    const apiKey = "101087216157325";
    return fetch(
      `https://www.superheroapi.com/api.php/${apiKey}/search/${query}`,
      {
        method: "GET",
      }
    )
      .then(res => res.json())
      .then(data => data.results)
      .catch((error) => {
        console.error(error);
        return [];
      });
}

export default HeroSearch