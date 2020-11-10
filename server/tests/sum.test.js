const sum = require('../helpers/sum')

test('Add 1 + 2 equal to 3', () => {
  expect(sum(1, 2)).toBe(3)
})

test('Test boolean', () => {
  const n = true
  const answer = false
  expect(n).toBe(!answer)
})