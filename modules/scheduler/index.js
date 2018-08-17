const cron = require('node-cron');
const JnuPoster = require('../jnuPoster/index.js');

const jnuPoster = new JnuPoster();
const execPost = (time) => {
  console.log(`${time} 포스팅 등록되었습니다.`);
  cron.schedule(time, () => {
    console.log(`${time} 포스팅 시작합니다.`);
    jnuPoster.post();
  });
}

const postTimes = [
  '4 * * * *',
  '3 * * * *'
];

postTimes.forEach(time => {
  execPost(time);
});
