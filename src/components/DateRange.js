import React from 'react';

const DateRange = ({ startDate, endDate, separator, children }) => {
  if (startDate === endDate) {
    return(<span className="DateRange">{startDate}</span>)
  } else {
    return(<span className="DateRange">{startDate} {separator || children || "—"} {endDate}</span>)
  }
};

export default DateRange;
