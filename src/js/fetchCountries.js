const countries = 'https://restcountries.com/v3.1/name';

export function fetchCountries(name) {
    return fetch(`${countries}${name}?fields=name,capital,population,flags,languages`)
    .then(response => response.json())
    .catch(error => console.log(error));
}