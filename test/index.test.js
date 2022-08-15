import Util from '../src/index';

test('show', () => {
  expect(Util.show('hanmeimei')).toBe('Hello World hanmeimei');
});
