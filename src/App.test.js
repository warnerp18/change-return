import { render, screen } from '@testing-library/react';
import { getChange } from './App';


beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

test('calculates correct amount of change to return using standard us currency amounts', () => {
  expect(getChange(99, [25, 10, 5, 1])).toEqual({25: 3, 10: 2, 1: 4})
  expect(getChange(21, [2, 34, 15, 51])).toEqual({15: 1, 2: 3})
});

test('calculates correct amount of change to return using random currency amounts', () => {
  expect(getChange(99, [2, 34, 15, 51])).toEqual({51: 1, 34: 1, 2: 7})
});

test('calculates correct amount of change to return when given unsorted array of change', () => {
    expect(getChange(99, [10, 1, 25, 5])).toEqual({25: 3, 10: 2, 1: 4})
});

test('throws error if amount of change to return is 0 or less', () => {
  expect(() => getChange(-99, [25, 10, 5, 1])).toThrow()
});
   
test('throws error if array of change is empty', () => {
  expect(() => getChange(-99, [])).toThrow()
});

test('throws error if array of change has a value that is not an integer', () => {
  expect(() => getChange(-99, [25, 10, '5', 1])).toThrow('amount passed must be a number greater than or equal to 0, passed: -99')
});

test('throws error if unable to give exact amount of change back', () => {
  expect(() => getChange(22, [2, 34, 15, 51])).toThrow('Unable to give correct change amount back: 1 remians');
});

