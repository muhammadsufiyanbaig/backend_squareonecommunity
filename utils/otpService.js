// const axios = require('axios');

const sendOtpToWhatsApp = async (whatsAppNo, otp) => {
  try {
    console.log(`Your OTP is ${otp}` );
    console.log(`Your WhatsApp is ${whatsAppNo}` );
    // const response = await axios.post('https://api.whatsapp.com/send', {
    //   phone: whatsAppNo,
    //   message: `Your OTP is ${otp}`
    // });
    // return response.data;
  } catch (error) {
    throw new Error('Error sending OTP to WhatsApp');
  }
};

module.exports = { sendOtpToWhatsApp };
