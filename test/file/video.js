const test = require('ava');
const { getVideoFile } = require('../../src/file/video');

test('', t => {
  return getVideoFile('').then((res) => {
    console.log(res);
    t.pass()
  });
});