import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const refs = {
    countryInputEl: document.querySelector('#search-box'),
    countryListEl: document.querySelector('.country-list'),
    countryInfoEl: document.querySelector('.country-info'),
}

const DEBOUNCE_DELAY = 300;

refs.countryInputEl.addEventListener('input', debounce(onTextInput, DEBOUNCE_DELAY));

function onTextInput() {

    const textInputValue = refs.countryInputEl.value.trim();

    if (textInputValue.length === 0) {
        return (refs.countryListEl.innerHTML = ''), (refs.countryInfoEl.innerHTML = '');
    };

    fetchCountries(textInputValue)
        
        .then(countries => {
            refs.countryListEl.innerHTML = '';
            refs.countryInfoEl.innerHTML = '';

            if (countries.length >= 10) {
                return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            };

            if (countries.length === 1) {
                refs.countryInfoEl.insertAdjacentHTML('beforeend', countryInfoMarkup(countries));

            } else { 
                refs.countryListEl.insertAdjacentHTML('beforeend', countryListMarkup(countries));
            };
        })
        
        .catch (() => {
            Notiflix.Notify.failure('Oops, there is no country with that name');
    });
};

function countryInfoMarkup(countries) { 
    const foundCountryInfo = countries;
    return foundCountryInfo
        .map(({ name, capital, population, flags, languages }) =>
            `<h1><img src="${flags.png}" alt="${name.official}" width="80" height="60">${name.official}</h1>
            <p>Capital: ${capital}</p>
            <p>Population: ${population}</p>
            <p>Languages: ${Object.values(languages)}</p>`,
        )
        .join('');
};

function countryListMarkup(countries) { 
    const foundCountryList = countries;
    return foundCountryList
        .map(({ name, flags }) =>
            `<li><img src="${flags.png}" alt="${name.official}" width="60" height="40">${name.official}</li>`
        )
        .join('');
};
