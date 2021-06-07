import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('This field is required'),
  lastName: Yup.string().required('This field is required'),
  email: Yup.string().email().required('This field is required'),
});

export default validationSchema;
