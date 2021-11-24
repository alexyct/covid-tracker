import React from 'react';
import { Line } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = (props) => {
  const dailyData = Object.values(props.targetData);

  const lineChart =
    // only display data if there is data i.e. the length of the data array is not 0
    dailyData.length !== 0 ? (
      <Line
        options={{
          plugins: {
            legend: false,
          },
          scales: {
            myScale: {
              min: 0,
              position: 'left', // `axis` is determined by the position as `'y'`
            },
          },
        }}
        data={{
          labels: dailyData.reverse().map(({ date }) => date),
          datasets: [
            {
              data: dailyData.reverse().map(({ casesDaily }) => casesDaily),
              borderColor: '#3333ff',
              fill: true,
            },
          ],
        }}
      />
    ) : null;

  return <div className={styles.container}>{lineChart}</div>;
};

export default Chart;
