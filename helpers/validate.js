const Validator = require('validatorjs');
const validator = (body, rules, customMessages, callBack) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callBack(null, true));
    validation.fails(() => callBack(validation.errors, false));
}

module.exports = validator;