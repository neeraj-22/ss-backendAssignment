// tests/math.test.js

const { findSum } = require('../controllers/testController');

describe('add function', () => {
  it('should add two numbers correctly', () => {
    expect(findSum(2, 3)).toBe(5);
  });

  it('should add negative numbers correctly', () => {
    expect(findSum(-2, -3)).toBe(-5);
  });

  it('should add a positive and a negative number correctly', () => {
    expect(findSum(5, -3)).toBe(2);
  });

  it('should handle zero correctly', () => {
    expect(findSum(0, 7)).toBe(7);
    expect(findSum(0, -5)).toBe(-5);
  });
});


//Sample response
// {
//   "success": true,
//   "rows": [
//       {
//           "EmployeeID": 2,
//           "FirstName": "Jane",
//           "LastName": "Smith",
//           "Age": 25,
//           "Email": "jane.smith@example.com"
//       }
//   ]
// }