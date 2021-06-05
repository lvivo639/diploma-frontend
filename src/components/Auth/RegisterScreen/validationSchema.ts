import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().min(4).max(40).required('This field is required'),
  lastName: Yup.string().min(4).max(40).required('This field is required'),
  username: Yup.string().min(4).max(20).required('This field is required'),
  email: Yup.string().email().required('This field is required'),
  role: Yup.string()
    .oneOf(['dropshipper', 'supplier'], 'Use one of roles')
    .required('This field is required'),
  password: Yup.string().min(8).max(64).required('This field is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('This field is required'),
});

export default validationSchema;
