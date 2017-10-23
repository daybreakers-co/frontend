import React from 'react';

const DateRange = ({ startDate, endDate, separator }) => {
  if (startDate === endDate) {
    return(<span>{startDate}</span>)
  } else {
    return(<span>{startDate} {separator || "—"} {endDate}</span>)
  }
};

export default DateRange;
