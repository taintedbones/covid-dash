export interface County {
  country: string;
  province: string;
  county: string;
  updatedAt: string;
  stats: {
    confirmed: number;
    deaths: number;
    recovered: number;
  };
  coordinates: {
    latitude: string;
    longitude: string;
  };
}

// For Country data return from Worldmeters
export interface Country {
  updated: number;
  country: string;
  countryInfo: {
    _id: number;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
  };
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  continent: string;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
  twoDayHist: {
    active: number;
    cases: number;
    deaths: number;
    recovered: number;
  }
}

// For country data returned from John Hopkins
export interface CountryJH {
  country: string;
  county: string;
  updatedAt: string;
  stats: {
    confirmed: number;
    deaths: number;
    recovered: number;
  };
  coordinates: {
    latitude: string;
    longitude: string;
  };
  province: string;
  twoDayHist: {
    active: number;
    confirmed: number;
    deaths: number;
    recovered: number;
  }
}

export interface CountryMapItem {
  id: string;
  value: number;
  country: string;
  flag: string;
}

export interface DataTotal {
  updated: number;
  cases: number;
  todayCases: number;
  deaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
  affectedCountries: number;
}


export interface State {
  state: string;
  updated: number;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  active: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  flag: string;
}

export interface StateMapItem {
  id: string;
  value: number;
  state: string;
  flag: string;
}
