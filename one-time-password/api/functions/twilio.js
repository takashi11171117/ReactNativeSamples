const twilio = require('twilio');

const accountSid = 'AC6de37600e88e990aca8ca3f40c4c656a';
const authToken = '3cf3ce0653161d833ed477cf7682686e';

module.exports = new twilio.Twilio(accountSid, authToken);