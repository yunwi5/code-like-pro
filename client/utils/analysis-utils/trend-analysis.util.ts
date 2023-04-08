import { DateTime } from 'luxon';
import {
  IChartData,
  IExerciseWithId,
  IUserSubmissionPopulated,
} from '../../models/interfaces';

// Exercise attempt trend DAILY
export function getDailyExerciseAttemptTrendData(
  submissions: IUserSubmissionPopulated[],
  numPeriods: number,
) {
  const [recentDaysList, recentDaysChartDataList] = getRecentDaysDataAsList(numPeriods);

  submissions.forEach((sub) => {
    const submissionDt = DateTime.fromISO(sub.postedAt).startOf('day');
    recentDaysChartDataList.forEach((dateData, idx) => {
      const date = recentDaysList[idx];

      // If the date is the same as created date of an exercise, increase its value.
      if (date.hasSame(submissionDt, 'day')) {
        dateData.value++;
      }
    });
  });
  return recentDaysChartDataList;
}

// Exercise creation trend DAILY.
export function getDailyExerciseCreationTrendData(
  creations: IExerciseWithId[],
  numPeriods: number,
) {
  const [recentDaysList, recentDaysChartDataList] = getRecentDaysDataAsList(numPeriods);

  creations.forEach((creation) => {
    const creationDt = DateTime.fromISO(creation.createdAt);
    recentDaysChartDataList.forEach((dateData, idx) => {
      const date = recentDaysList[idx];

      // If the date is the same as created date of an exercise, increase its value.
      if (date.hasSame(creationDt, 'day')) {
        dateData.value++;
      }
    });
  });
  return recentDaysChartDataList;
}

// Exercise attempt trend WEEKLY
export function getWeeklyExerciseAttemptTrendData(
  submissions: IUserSubmissionPopulated[],
  numPeriods: number,
) {
  const [recentWeeksList, recentWeeksChartDataList] =
    getRecentWeeksDataAsList(numPeriods);

  submissions.forEach((sub, idx) => {
    const submissionWeekDt = DateTime.fromISO(sub.postedAt);

    recentWeeksChartDataList.forEach((weekData, idx) => {
      const week = recentWeeksList[idx];

      // If the week of the chart label is the same as created week of an exercise, increase its value.
      if (week.hasSame(submissionWeekDt, 'week')) {
        weekData.value++;
      }
    });
  });
  return recentWeeksChartDataList;
}

// Exercise creation trend WEEKLY
export function getWeeklyExerciseCreationTrendData(
  creations: IExerciseWithId[],
  numPeriods: number,
) {
  const [recentWeeksList, recentWeeksChartDataList] =
    getRecentWeeksDataAsList(numPeriods);

  creations.forEach((creation) => {
    const creationWeekDt = DateTime.fromISO(creation.createdAt).startOf('week');

    recentWeeksChartDataList.forEach((weekData, idx) => {
      const week = recentWeeksList[idx];

      // If the week of the chart label is the same as created week of an exercise, increase its value.
      if (week.hasSame(creationWeekDt, 'week')) {
        weekData.value++;
      }
    });
  });
  return recentWeeksChartDataList;
}

// Exercise creation trend MONTLY
export function getMontlyExerciseCreationTrendData(
  creations: IExerciseWithId[],
  numPeriods: number,
) {
  const [recentMonthsList, recentMonthsChartDataList] =
    getRecentMonthsDataAsList(numPeriods);

  creations.forEach((creation) => {
    const createdAt = DateTime.fromISO(creation.createdAt);

    recentMonthsChartDataList.forEach((monthData, idx) => {
      const month = recentMonthsList[idx];

      // If the month of the chart label is the same as created month of an exercise, increase its value.
      if (month.hasSame(createdAt, 'month')) {
        monthData.value++;
      }
    });
  });
  return recentMonthsChartDataList;
}

// Exercise attempt trend MONTLY
export function getMonthlyExerciseAttemptTrendData(
  submissions: IUserSubmissionPopulated[],
  numPeriods: number,
) {
  const [recentMonthsList, recentMonthsChartDataList] =
    getRecentMonthsDataAsList(numPeriods);

  submissions.forEach((sub) => {
    const submissionDt = DateTime.fromISO(sub.postedAt);

    recentMonthsChartDataList.forEach((monthData, idx) => {
      const month = recentMonthsList[idx];

      // If the month of the chart label is the same as created month of an exercise, increase its value.
      if (month.hasSame(submissionDt, 'month')) {
        monthData.value++;
      }
    });
  });
  return recentMonthsChartDataList;
}

// Exercise creation trend YEARLY
export function getYearlyExerciseCreationTrendData(
  creations: IExerciseWithId[],
  numPeriods: number,
) {
  const [recentYearsList, recentYearsChartDataList] =
    getRecentYearsDataAsList(numPeriods);

  creations.forEach((creation) => {
    const createdDt = DateTime.fromISO(creation.createdAt);

    recentYearsChartDataList.forEach((yearData, idx) => {
      const year = recentYearsList[idx];

      // If the year of the chart label is the same as created year of an exercise, increase its value.
      if (year.hasSame(createdDt, 'year')) {
        yearData.value++;
      }
    });
  });
  return recentYearsChartDataList;
}

// Exercise attempt trend YEARLY
export function getYearlyExerciseAttemptTrendData(
  submissions: IUserSubmissionPopulated[],
  numPeriods: number,
) {
  const [recentYearsList, recentYearsChartDataList] =
    getRecentYearsDataAsList(numPeriods);

  submissions.forEach((sub) => {
    const submissionDt = DateTime.fromISO(sub.postedAt);

    recentYearsChartDataList.forEach((yearData, idx) => {
      const year = recentYearsList[idx];

      // If the year of the chart label is the same as created year of an exercise, increase its value.
      if (year.hasSame(submissionDt, 'year')) {
        yearData.value++;
      }
    });
  });
  return recentYearsChartDataList;
}

function getRecentDaysDataAsList(numPeriods: number): [DateTime[], IChartData[]] {
  const today = DateTime.now().startOf('day');

  // Create a list of recent days for trend.
  const recentDaysList: DateTime[] = [];
  for (let i = 0; i < numPeriods; i++) {
    const recentDay = today.minus({ days: i });
    recentDaysList.push(recentDay);
  }
  // The oldest day is the first element, the most recent day is the last element
  recentDaysList.reverse();

  const recentDaysChartDataList: IChartData[] = recentDaysList.map((day) => ({
    label: day.toLocaleString({ month: 'short', day: 'numeric' }),
    value: 0,
  }));

  return [recentDaysList, recentDaysChartDataList];
}

function getRecentWeeksDataAsList(numPeriods: number): [DateTime[], IChartData[]] {
  const weekEnding = DateTime.now().endOf('week');

  // create a list of recent weeks for trend.
  const recentWeeksList: DateTime[] = [];
  for (let i = 0; i < numPeriods; i++) {
    const recentWeek = weekEnding.minus({ weeks: i });
    recentWeeksList.push(recentWeek);
  }
  // The oldest week is the first element, the most recent week is the last element
  recentWeeksList.reverse();

  const recentWeeksChartDataList: IChartData[] = recentWeeksList.map((week) => ({
    label: week.toLocaleString({ month: 'short', day: 'numeric' }),
    value: 0,
  }));
  return [recentWeeksList, recentWeeksChartDataList];
}

function getRecentMonthsDataAsList(numPeriods: number): [DateTime[], IChartData[]] {
  const currentMonth = DateTime.now().startOf('month');

  // create a list of recent months for a trend.
  const recentMonthsList: DateTime[] = [];
  for (let i = 0; i < numPeriods; i++) {
    const recentMonth = currentMonth.minus({ months: i });
    recentMonthsList.push(recentMonth);
  }
  // The oldest month is the first element, the most recent month is the last element.
  recentMonthsList.reverse();

  const recentMonthsChartDataList: IChartData[] = recentMonthsList.map((month) => ({
    label: month.toLocaleString({ month: 'long' }),
    value: 0,
  }));
  return [recentMonthsList, recentMonthsChartDataList];
}

function getRecentYearsDataAsList(numPeriods: number): [DateTime[], IChartData[]] {
  const currentYear = DateTime.now().startOf('year');

  // create a list of recent years for a trend
  const recentYearsList: DateTime[] = [];
  for (let i = 0; i < numPeriods; i++) {
    const recentYear = currentYear.minus({ years: i });
    recentYearsList.push(recentYear);
  }
  // The oldest month is the first element, the most recent month is the last element.
  recentYearsList.reverse();

  const recentYearsChartDataList: IChartData[] = recentYearsList.map((year) => ({
    label: year.toLocaleString({ year: 'numeric' }),
    value: 0,
  }));
  return [recentYearsList, recentYearsChartDataList];
}
