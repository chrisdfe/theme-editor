import React, { useState } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import {
  format,
  startOfYear,
  lastDayOfYear,
  addDays,
  addWeeks,
  isSameDay,
  subDays,
  isBefore,
  isAfter,
  getISOWeeksInYear,
} from "date-fns";

import "./CalendarGrid.css";

const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getWeekdayKey = (date) => format(date, "eeee").toLowerCase();

const getCalendarStartDay = (firstDayOfYear) => {
  // Number of days to subtract from firstDayOfYear to get to calendarStartDay
  const numDaysToAddMap = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  const dayOfWeek = getWeekdayKey(firstDayOfYear);
  const calendarStartDay = subDays(firstDayOfYear, numDaysToAddMap[dayOfWeek]);
  return calendarStartDay;
};

const CalendarGridCell = ({
  date,
  isTodaysDate,
  isDisabled,
  isSelected,
  onMouseOver,
  onMouseOut,
  onClick,
}) => {
  const className = classnames("CalendarGridCell", {
    "CalendarGridCell--disabled": isDisabled,
    "CalendarGridCell--is-todays-date": isTodaysDate,
    "CalendarGridCell--is-selected": isSelected,
  });

  return (
    <div
      className="CalendarGridCellWrapper"
      onMouseOver={() => {
        if (isDisabled) return;
        onMouseOver(date);
      }}
      onMouseOut={() => {
        if (isDisabled) return;
        onMouseOut(date);
      }}
      onClick={() => {
        if (isDisabled) return;
        onClick(date);
      }}
    >
      <div className={className} />
    </div>
  );
};

const CalendarGridColumn = ({
  weekIndex,
  todaysDate,
  selectedDate,
  calendarStartDay,
  firstDayOfCurrentYear,
  lastDayOfCurrentYear,
  onCellMouseOver,
  onCellMouseOut,
  onCellClick,
}) => {
  return (
    <div className="CalendarGridColumn">
      {daysOfTheWeek.map((day, index) => {
        const date = addDays(calendarStartDay, index);
        const isTodaysDate = isSameDay(date, todaysDate);
        const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
        const isDisabled =
          isBefore(date, firstDayOfCurrentYear) ||
          isAfter(date, lastDayOfCurrentYear);

        return (
          <CalendarGridCell
            key={day}
            date={date}
            isTodaysDate={isTodaysDate}
            isSelected={isSelected}
            isDisabled={isDisabled}
            onMouseOver={onCellMouseOver}
            onMouseOut={onCellMouseOut}
            onClick={onCellClick}
          />
        );
      })}
    </div>
  );
};

const CalendarGrid = ({ todaysDate, selectedDate, onDateClicked }) => {
  const firstDayOfCurrentYear = startOfYear(todaysDate);
  const lastDayOfCurrentYear = lastDayOfYear(todaysDate);

  const calendarStartDay = getCalendarStartDay(firstDayOfCurrentYear);

  const weeksInYear = getISOWeeksInYear(todaysDate);

  const [hoveredCell, setHoveredCell] = useState(null);

  return (
    <div className="CalendarGridWrapper">
      <div className="CalendarGridWrapper__inner">
        <div className="CalendarGrid">
          {[...new Array(weeksInYear)].map((n, weekIndex) => (
            <CalendarGridColumn
              key={weekIndex}
              weekIndex={weekIndex}
              todaysDate={todaysDate}
              selectedDate={selectedDate}
              firstDayOfCurrentYear={firstDayOfCurrentYear}
              lastDayOfCurrentYear={lastDayOfCurrentYear}
              calendarStartDay={addWeeks(calendarStartDay, weekIndex)}
              onCellMouseOver={(date) => {
                setHoveredCell(date);
              }}
              onCellMouseOut={(date) => {
                setHoveredCell(null);
              }}
              onCellClick={(date) => {
                onDateClicked(date);
              }}
            />
          ))}
        </div>
        <div className="CalendarGridWrapper__date-label">
          {hoveredCell && format(hoveredCell, "MMM dd, yyyy")}
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;
