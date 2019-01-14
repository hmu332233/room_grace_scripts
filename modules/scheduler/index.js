const cron = require('node-cron');
const JnuPoster = require('../jnuPoster/index.js');
const NotifySender = require('../NotifySender/index.js');

const jnuPoster = new JnuPoster();
const execPost = (time) => {
  NotifySender.send(`${time} 포스팅 예약 등록되었습니다.`)
  cron.schedule(time, () => {
    NotifySender.send(`${time} 포스팅 시작합니다.`)
    jnuPoster.post();
  });
}

const postTimes = [
  '0 1 * * *',
  '0 5 * * *',
  '0 9 * * *',
  '0 13 * * *'
];

postTimes.forEach(time => {
  execPost(time);
});
