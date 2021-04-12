const { expect } = require('@jest/globals');
const totalLikes = require('../utils/list_helper').totalLikes;

describe('totalLikes', () => {
  test('returns zero when empty', () => {
    expect(totalLikes([])).toBe(0);
  });

  test('returns correct number for 1 blog', () => {
    expect(totalLikes([{ likes: 2, name: 'Domino' }])).toBe(2);
  });

  test('returns correct number for 2 blogs', () => {
    expect(totalLikes([{ likes: 3 }, { likes: 2 }])).toBe(5);
  });

  test('returns correct number for 3 blogs', () => {
    expect(totalLikes([{ likes: 8 }, { likes: 1 }, { likes: 1 }])).toBe(10);
  });
});
