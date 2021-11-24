const validate = (values) => {
//   console.log(values);
  const errors = {};
  if (!values.oldPassword) {
    errors.oldPassword = "Required";
  }
  if (!values.newPassword) {
    errors.newPassword = "Required";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = "not same";
  }
//   console.log(errors);
  return errors;
};
export default validate;
