/**
 * Date utility functions
 * Comprehensive date manipulation and calculation functions
 */

import { DATE_FORMATS } from './constants';

/**
 * Gets the current date
 */
export const getCurrentDate = (): Date => {
  return new Date();
};

/**
 * Gets the current timestamp
 */
export const getCurrentTimestamp = (): number => {
  return Date.now();
};

/**
 * Gets the current ISO string
 */
export const getCurrentISOString = (): string => {
  return new Date().toISOString();
};

/**
 * Adds days to a date
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Adds months to a date
 */
export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

/**
 * Adds years to a date
 */
export const addYears = (date: Date, years: number): Date => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
};

/**
 * Gets the start of day
 */
export const getStartOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * Gets the end of day
 */
export const getEndOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

/**
 * Gets the start of week (Monday)
 */
export const getStartOfWeek = (date: Date): Date => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = result.getDate() - day + (day === 0 ? -6 : 1);
  result.setDate(diff);
  return getStartOfDay(result);
};

/**
 * Gets the end of week (Sunday)
 */
export const getEndOfWeek = (date: Date): Date => {
  const result = getStartOfWeek(date);
  return getEndOfDay(addDays(result, 6));
};

/**
 * Gets the start of month
 */
export const getStartOfMonth = (date: Date): Date => {
  const result = new Date(date);
  result.setDate(1);
  return getStartOfDay(result);
};

/**
 * Gets the end of month
 */
export const getEndOfMonth = (date: Date): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + 1, 0);
  return getEndOfDay(result);
};

/**
 * Gets the start of year
 */
export const getStartOfYear = (date: Date): Date => {
  const result = new Date(date);
  result.setMonth(0, 1);
  return getStartOfDay(result);
};

/**
 * Gets the end of year
 */
export const getEndOfYear = (date: Date): Date => {
  const result = new Date(date);
  result.setMonth(11, 31);
  return getEndOfDay(result);
};

/**
 * Calculates the difference between two dates in days
 */
export const getDaysDifference = (date1: Date, date2: Date): number => {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

/**
 * Calculates the difference between two dates in hours
 */
export const getHoursDifference = (date1: Date, date2: Date): number => {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDiff / (1000 * 3600));
};

/**
 * Calculates the difference between two dates in minutes
 */
export const getMinutesDifference = (date1: Date, date2: Date): number => {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDiff / (1000 * 60));
};

/**
 * Checks if a date is today
 */
export const isToday = (date: Date): boolean => {
  const today = getCurrentDate();
  return date.toDateString() === today.toDateString();
};

/**
 * Checks if a date is yesterday
 */
export const isYesterday = (date: Date): boolean => {
  const yesterday = addDays(getCurrentDate(), -1);
  return date.toDateString() === yesterday.toDateString();
};

/**
 * Checks if a date is tomorrow
 */
export const isTomorrow = (date: Date): boolean => {
  const tomorrow = addDays(getCurrentDate(), 1);
  return date.toDateString() === tomorrow.toDateString();
};

/**
 * Checks if a date is in the past
 */
export const isPast = (date: Date): boolean => {
  return date < getCurrentDate();
};

/**
 * Checks if a date is in the future
 */
export const isFuture = (date: Date): boolean => {
  return date > getCurrentDate();
};

/**
 * Checks if a date is within a range
 */
export const isWithinRange = (date: Date, start: Date, end: Date): boolean => {
  return date >= start && date <= end;
};

/**
 * Gets the age from a birth date
 */
export const getAge = (birthDate: Date): number => {
  const today = getCurrentDate();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Gets the number of days in a month
 */
export const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

/**
 * Checks if a year is a leap year
 */
export const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

/**
 * Gets the quarter of a date
 */
export const getQuarter = (date: Date): number => {
  return Math.ceil((date.getMonth() + 1) / 3);
};

/**
 * Gets the week number of a date
 */
export const getWeekNumber = (date: Date): number => {
  const start = getStartOfYear(date);
  const days = getDaysDifference(start, date);
  return Math.ceil((days + start.getDay() + 1) / 7);
};

/**
 * Converts a date to a specific format
 */
export const formatDate = (date: Date, format: string): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return format
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
};

/**
 * Parses a date string
 */
export const parseDate = (dateString: string): Date | null => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

/**
 * Gets business days between two dates (excluding weekends)
 */
export const getBusinessDays = (start: Date, end: Date): number => {
  let count = 0;
  const current = new Date(start);
  
  while (current <= end) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  
  return count;
};

/**
 * Gets the next business day
 */
export const getNextBusinessDay = (date: Date): Date => {
  let nextDay = addDays(date, 1);
  
  while (nextDay.getDay() === 0 || nextDay.getDay() === 6) {
    nextDay = addDays(nextDay, 1);
  }
  
  return nextDay;
};

/**
 * Gets the previous business day
 */
export const getPreviousBusinessDay = (date: Date): Date => {
  let prevDay = addDays(date, -1);
  
  while (prevDay.getDay() === 0 || prevDay.getDay() === 6) {
    prevDay = addDays(prevDay, -1);
  }
  
  return prevDay;
};
