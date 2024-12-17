
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function isValidDateOfBirth(dateOfBirth) {
    const dobRegex = /^\d{2}-\d{2}-\d{4}$/;
    return dobRegex.test(dateOfBirth);
  }
  
  function isValidPhone(phone) {
    const phoneRegex = /^\+\d{2}-\d{10}$/; 
    return phoneRegex.test(phone);
  }
  
  module.exports = {
    isValidEmail,
    isValidDateOfBirth,
    isValidPhone,
  };
  