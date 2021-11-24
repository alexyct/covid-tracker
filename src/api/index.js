import axios from 'axios';

// Get Global Data for Today
const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};

// Get UK Data Over Time
export const fetchDailyData = async () => {
  const endpoint =
    'https://api.coronavirus.data.gov.uk/v1/data?' +
    'filters=areaType=nation;areaName=england&' +
    'structure={"date":"date","newCases":"newCasesByPublishDate", "newDeaths":"newDeaths28DaysByPublishDate"}';

  try {
    const {
      data: { data },
    } = await axios.get(endpoint);

    return data.map(({ newCases, newDeaths, date }) => ({
      casesDaily: newCases,
      deathsDaily: newDeaths,
      date: date,
    }));
  } catch (error) {
    return error;
  }
};
