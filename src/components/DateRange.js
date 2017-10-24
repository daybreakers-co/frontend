import React from 'react';

const DateRange = ({ startDate, endDate, separator, children }) => {
  if (startDate === endDate) {
    return(<span>{startDate}</span>)
  } else {
    return(<span>{startDate} {separator || children || "—"} {endDate}</span>)
  }
};

export default DateRange;
