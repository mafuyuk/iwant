const test = require('ava');
const video = require('../../../../src/assets/js/direct-player/video');

// TODO
test.skip('getVideoFile test', async t => {
  const testData = [
    {
      expected: [],
    }
  ];

  for (const d of testData) {
    const res = await video.getVideoFile('/');
    t.deepEqual(res, d.expected);
  }
});
