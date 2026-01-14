import { useState } from "react";

export function useDateRange(initialStartDate = "", initialEndDate = "") {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const onStartDateChange = value => {
    setStartDate(value);

    // jeśli endDate jest wcześniej niż startDate → reset
    if (endDate && value && endDate < value) {
      setEndDate("");
    }
  };

  const onEndDateChange = value => {
    // nie pozwalamy wybrać daty wcześniejszej niż startDate
    if (!startDate || value >= startDate) {
      setEndDate(value);
    }
  };

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    onStartDateChange,
    onEndDateChange,
    isValid: Boolean(startDate && endDate),
  };
}
