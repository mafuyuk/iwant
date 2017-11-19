const test = require('ava');
const fv = require('../../src/file/video');

// TODO
test.skip('getVideoFile test', async t => {
  const testData = [
    {
      expected: [],
    }
  ];

  for (const d of testData) {
    const res = await fv.getVideoFile('/');
    t.deepEqual(res, d.expected);
  }
});