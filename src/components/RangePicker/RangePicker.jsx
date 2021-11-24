import React from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './RangePicker.module.css';
const Ranges = ({ handleRangeChange }) => {
  const ranges = ['Last Week', 'Last Month', 'Last Year'];

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleRangeChange(e.target.value)}
      >
        {ranges.map((range, i) => (
          <option key={i} value={range}>
            {range}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default Ranges;
