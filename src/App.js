import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Cards, Chart, CountryPicker, RangePicker } from './components';
import styles from './App.module.css';
import { fetchDailyData, fetchData } from './api';

// Create basic class based compoent

class App extends React.Component {
  state = {
    data: {},
    dailyData: {},
    targetData: {},
    country: '',
    range: '',
    global: false,
  };

  // fetch data and then set it as data in our state
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });

    const fetchedDailyData = await fetchDailyData();
    console.log(fetchedDailyData);
    this.setState({
      dailyData: fetchedDailyData,
    });
    this.setState({
      targetData: fetchedDailyData.slice(0, 7),
    });
  }

  // create method that can change the state of the country
  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({ data, country: country });
  };

  handleRangeChange = async (range) => {
    if (range === 'Last Week') {
      this.setState({ targetData: this.state.dailyData.slice(0, 7) });
    } else if (range === 'Last Month') {
      this.setState({ targetData: this.state.dailyData.slice(0, 30) });
    } else if (range === 'Last Year') {
      this.setState({ targetData: this.state.dailyData.slice(0, 365) });
    }

    this.setState({ range: range });
  };

  render() {
    // So we can just call data instead of this.state.data
    const { data } = this.state;
    const { targetData } = this.state;

    return (
      <div className={styles.container}>
        <Typography variant="h4" align="center">
          UK COVID-19 Cases
        </Typography>
        <RangePicker handleRangeChange={this.handleRangeChange} />
        <Chart targetData={targetData} />
        <Typography variant="h4" align="center" style={{ marginTop: 80 }}>
          Global COVID-19 Cases
        </Typography>
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Cards data={data} />
      </div>
    );
  }
}

export default App;
