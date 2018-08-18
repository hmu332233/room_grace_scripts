const request = require('request');

const LINE_URL = 'https://notify-api.line.me/api/notify';
const TOKEN = process.env['notify_token'];

class NotifySender {
  static send(message) {
    const options = {
      method: 'POST',
      url: LINE_URL,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'content-type': 'multipart/form-data;'
      },
      formData: { message: `\n\n${message}` }
    };
    request(options, function(error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
    });
  }
}

module.exports = NotifySender;