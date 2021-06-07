import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  password: Yup.string().min(8).max(64).required('This field is required'),
  newPassword: Yup.string().min(8).max(64).required('This field is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('This field is required'),
});

export default validationSchema;
