/**
 * Number utility functions
 * Comprehensive number manipulation and calculation functions
 */

/**
 * Clamps a number between min and max values
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Rounds a number to a specified number of decimal places
 */
export const round = (value: number, decimals: number = 2): number => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

/**
 * Rounds a number up to the nearest integer
 */
export const ceil = (value: number): number => {
  return Math.ceil(value);
};

/**
 * Rounds a number down to the nearest integer
 */
export const floor = (value: number): number => {
  return Math.floor(value);
};

/**
 * Checks if a number is even
 */
export const isEven = (value: number): boolean => {
  return value % 2 === 0;
};

/**
 * Checks if a number is odd
 */
export const isOdd = (value: number): boolean => {
  return value % 2 !== 0;
};

/**
 * Checks if a number is positive
 */
export const isPositive = (value: number): boolean => {
  return value > 0;
};

/**
 * Checks if a number is negative
 */
export const isNegative = (value: number): boolean => {
  return value < 0;
};

/**
 * Checks if a number is zero
 */
export const isZero = (value: number): boolean => {
  return value === 0;
};

/**
 * Checks if a number is an integer
 */
export const isInteger = (value: number): boolean => {
  return Number.isInteger(value);
};

/**
 * Checks if a number is a float
 */
export const isFloat = (value: number): boolean => {
  return !Number.isInteger(value);
};

/**
 * Checks if a number is finite
 */
export const isFinite = (value: number): boolean => {
  return Number.isFinite(value);
};

/**
 * Checks if a number is NaN
 */
export const isNaN = (value: number): boolean => {
  return Number.isNaN(value);
};

/**
 * Gets the absolute value of a number
 */
export const abs = (value: number): number => {
  return Math.abs(value);
};

/**
 * Gets the sign of a number
 */
export const sign = (value: number): number => {
  return Math.sign(value);
};

/**
 * Gets the maximum value from an array of numbers
 */
export const max = (...values: number[]): number => {
  return Math.max(...values);
};

/**
 * Gets the minimum value from an array of numbers
 */
export const min = (...values: number[]): number => {
  return Math.min(...values);
};

/**
 * Calculates the sum of an array of numbers
 */
export const sum = (values: number[]): number => {
  return values.reduce((acc, value) => acc + value, 0);
};

/**
 * Calculates the average of an array of numbers
 */
export const average = (values: number[]): number => {
  if (values.length === 0) return 0;
  return sum(values) / values.length;
};

/**
 * Calculates the median of an array of numbers
 */
export const median = (values: number[]): number => {
  if (values.length === 0) return 0;
  
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  
  return sorted[middle];
};

/**
 * Calculates the mode of an array of numbers
 */
export const mode = (values: number[]): number => {
  if (values.length === 0) return 0;
  
  const frequency: Record<number, number> = {};
  let maxFreq = 0;
  let mode = values[0];
  
  for (const value of values) {
    frequency[value] = (frequency[value] || 0) + 1;
    if (frequency[value] > maxFreq) {
      maxFreq = frequency[value];
      mode = value;
    }
  }
  
  return mode;
};

/**
 * Calculates the standard deviation of an array of numbers
 */
export const standardDeviation = (values: number[]): number => {
  if (values.length === 0) return 0;
  
  const avg = average(values);
  const squaredDiffs = values.map(value => Math.pow(value - avg, 2));
  const avgSquaredDiff = average(squaredDiffs);
  
  return Math.sqrt(avgSquaredDiff);
};

/**
 * Calculates the variance of an array of numbers
 */
export const variance = (values: number[]): number => {
  if (values.length === 0) return 0;
  
  const avg = average(values);
  const squaredDiffs = values.map(value => Math.pow(value - avg, 2));
  
  return average(squaredDiffs);
};

/**
 * Calculates the percentage change between two numbers
 */
export const percentageChange = (oldValue: number, newValue: number): number => {
  if (oldValue === 0) return newValue > 0 ? 100 : 0;
  return ((newValue - oldValue) / oldValue) * 100;
};

/**
 * Calculates the percentage of a number
 */
export const percentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return (value / total) * 100;
};

/**
 * Formats a number as currency
 */
export const formatCurrency = (value: number, currency: string = 'CHF', locale: string = 'de-CH'): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(value);
  } catch (error) {
    console.error('Currency formatting error:', error);
    return `${currency} ${value.toFixed(2)}`;
  }
};

/**
 * Formats a number with thousand separators
 */
export const formatNumber = (value: number, locale: string = 'de-CH'): string => {
  try {
    return new Intl.NumberFormat(locale).format(value);
  } catch (error) {
    console.error('Number formatting error:', error);
    return value.toString();
  }
};

/**
 * Formats a number as a percentage
 */
export const formatPercentage = (value: number, decimals: number = 1, locale: string = 'de-CH'): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value / 100);
  } catch (error) {
    console.error('Percentage formatting error:', error);
    return `${value.toFixed(decimals)}%`;
  }
};

/**
 * Generates a random number between min and max (inclusive)
 */
export const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generates a random float between min and max
 */
export const randomFloat = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Generates an array of random numbers
 */
export const randomArray = (length: number, min: number, max: number): number[] => {
  return Array.from({ length }, () => random(min, max));
};

/**
 * Calculates the factorial of a number
 */
export const factorial = (n: number): number => {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

/**
 * Calculates the greatest common divisor of two numbers
 */
export const gcd = (a: number, b: number): number => {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

/**
 * Calculates the least common multiple of two numbers
 */
export const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b);
};

/**
 * Checks if a number is prime
 */
export const isPrime = (n: number): boolean => {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  
  return true;
};

/**
 * Generates prime numbers up to a given limit
 */
export const generatePrimes = (limit: number): number[] => {
  const primes: number[] = [];
  const sieve = new Array(limit + 1).fill(true);
  
  for (let i = 2; i <= limit; i++) {
    if (sieve[i]) {
      primes.push(i);
      for (let j = i * i; j <= limit; j += i) {
        sieve[j] = false;
      }
    }
  }
  
  return primes;
};

/**
 * Calculates the Fibonacci number at a given position
 */
export const fibonacci = (n: number): number => {
  if (n < 0) return NaN;
  if (n === 0) return 0;
  if (n === 1) return 1;
  
  let a = 0;
  let b = 1;
  
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  
  return b;
};

/**
 * Generates Fibonacci sequence up to a given limit
 */
export const generateFibonacci = (limit: number): number[] => {
  const sequence: number[] = [];
  let a = 0;
  let b = 1;
  
  while (a <= limit) {
    sequence.push(a);
    const temp = a + b;
    a = b;
    b = temp;
  }
  
  return sequence;
};
