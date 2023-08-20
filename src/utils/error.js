const ERROR_CODES = {
  EMAIL_NOT_FOUND: "Пользователь с такой почтой не был найден.",
  INVALID_PASSWORD: "Не верный пароль.",
  auth: 'Пожалуйста войдите в систему',
};

function error(code) {
  return ERROR_CODES[code] ? ERROR_CODES[code] : "Неизвестная ошибка";
}

export default error;
