/* eslint-disable func-names */
const { resCodes } = require("../constants");
const Validators = require("../validators");

module.exports =  (validator) => {
  // eslint-disable-next-line no-prototype-builtins
  if (!Validators.hasOwnProperty(validator)) {
    throw new Error(`'${validator}' validator is not exist`);
  }

  // eslint-disable-next-line func-names
  // eslint-disable-next-line consistent-return
  return async function (req, res, next) {
    try {
      const validated = await Validators[validator].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err) {
      if (err.isJoi) {
        return res.status(resCodes.VALIDATION).send({ message: err.message });
      }
      return res.status(resCodes.ERROR).send();
    }
  };
};
