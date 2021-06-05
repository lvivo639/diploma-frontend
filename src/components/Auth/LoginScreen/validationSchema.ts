import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required('This field is required'),
  password: Yup.string().required('This field is required'),
});

export default validationSchema;
