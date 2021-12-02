import { useState, useEffect } from "react";
import axios from "axios";
import { Country, CountryMapItem } from "./DataInterfaces";


export const useAllCountriesMapData = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [countries, setCountries] = useState<Country[]>([]);
  const [confirmedCases, setConfirmedCases] = useState<CountryMapItem[]>([]);
  const [activeCases, setActiveCases] = useState<CountryMapItem[]>([]);
  const [recoveredCases, setRecoveredCases] = useState<CountryMapItem[]>([]);
  const [deathsCases, setDeathsCases] = useState<CountryMapItem[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);

      try {
        const r = await axios.get("https://disease.sh/v3/covid-19/countries");
        const temp: any[] = r.data;
        const countryList: any[] = temp.map((country, idx) => ({
          // ...country,
          updated: country.updated,
          country: country.country,
          countryInfo: {
            _id: country.countryInfo._id,
            iso2: country.countryInfo.iso2,
            iso3: country.countryInfo.iso3,
            lat: country.countryInfo.lat,
            long: country.countryInfo.long,
            flag: country.countryInfo.flag,
          },
          cases: country.cases,
          todayCases: country.todayCases,
          deaths: country.deaths,
          todayDeaths: country.todayDeaths,
          recovered: country.recovered,
          todayRecovered: country.todayRecovered,
          active: country.active,
          critical: country.critical,
          casesPerOneMillion: country.casesPerOneMillion,
          deathsPerOneMillion: country.deathsPerOneMillion,
          tests: country.tests,
          testsPerOneMillion: country.testsPerOneMillion,
          population: country.population,
          continent: country.continent,
          oneCasePerPeople: country.oneCasePerPeople,
          oneDeathPerPeople: country.oneDeathPerPeople,
          oneTestPerPeople: country.oneTestPerPeople,
          activePerOneMillion: country.activePerOneMillion,
          recoveredPerOneMillion: country.recoveredPerOneMillion,
          criticalPerOneMillion: country.criticalPerOneMillion,
          id: idx,
        }));

        setCountries(countryList);
        setConfirmedCases(
          countryList.map((country: Country) => ({
            id: (country.countryInfo.iso3 ? country.countryInfo.iso3 : country.country),
            value: country.cases,
            country: country.country,
            flag: country.countryInfo.flag,
          }))
        );
        setActiveCases(
          countryList.map((country: Country) => ({
            id: (country.countryInfo.iso3 ? country.countryInfo.iso3 : country.country),
            value: country.active,
            country: country.country,
            flag: country.countryInfo.flag,
          }))
        );
        setRecoveredCases(
          countryList.map((country: Country) => ({
            id: (country.countryInfo.iso3 ? country.countryInfo.iso3 : country.country),
            value: country.recovered,
            country: country.country,
            flag: country.countryInfo.flag,
          }))
        );
        setDeathsCases(
          countryList.map((country: Country) => ({
            id: (country.countryInfo.iso3 ? country.countryInfo.iso3 : country.country),
            value: country.deaths,
            country: country.country,
            flag: country.countryInfo.flag,
          }))
        );

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    if(countries.length === 0) {
      fetchCountries();
    }
  }, []);

  return { loading, countries, confirmedCases, activeCases, recoveredCases, deathsCases };
};

export const GetAllCountriesStatsData = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [countries, setCountries] = useState<Country[]>();

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);

      try {
        const r = await axios.get("https://disease.sh/v3/covid-19/countries");
        const temp: any[] = r.data;
        const countryList: any[] = temp.map((country, idx) => ({
          updated: country.updated,
          country: country.country,
          countryInfo: {
            _id: country.countryInfo._id,
            iso2: country.countryInfo.iso2,
            iso3: country.countryInfo.iso3,
            lat: country.countryInfo.lat,
            long: country.countryInfo.long,
            flag: country.countryInfo.flag,
          },
          cases: country.cases,
          todayCases: country.todayCases,
          deaths: country.deaths,
          todayDeaths: country.todayDeaths,
          recovered: country.recovered,
          todayRecovered: country.todayRecovered,
          active: country.active,
          critical: country.critical,
          casesPerOneMillion: country.casesPerOneMillion,
          deathsPerOneMillion: country.deathsPerOneMillion,
          tests: country.tests,
          testsPerOneMillion: country.testsPerOneMillion,
          population: country.population,
          continent: country.continent,
          oneCasePerPeople: country.oneCasePerPeople,
          oneDeathPerPeople: country.oneDeathPerPeople,
          oneTestPerPeople: country.oneTestPerPeople,
          activePerOneMillion: country.activePerOneMillion,
          recoveredPerOneMillion: country.recoveredPerOneMillion,
          criticalPerOneMillion: country.criticalPerOneMillion,
          id: idx,
        }));

        setCountries(countryList);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if(countries === undefined) {
      fetchCountries();
    }
  }, []);

  return { loading, countries };
};
 