import _ from "lodash";

const required = (field) => {
  return `${field} is required!`;
};

const min = (field, len) => {
  if (_.isString(field)) {
    return `${field} must be atleast ${len} characters!`;
  } else if (_.isNumber(field)) {
    return `${field} must be equal or bigger than ${len}!`;
  } else {
    return `${field} length must be atleast ${len} elements!`;
  }
};

const max = (field, len) => {
  if (_.isString(field)) {
    return `${field} must not be longer than ${len} characters!`;
  } else if (_.isNumber(field)) {
    return `${field} must be lower than ${len}!`;
  } else {
    return `${field} length must has less than ${len} elements!`;
  }
};

export { required, min, max };
