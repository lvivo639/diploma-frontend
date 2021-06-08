import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  address: Yup.string().required('This field is required'),
  fullName: Yup.string().required('This field is required'),
  description: Yup.string().required('This field is required'),
  price: Yup.number().required(),
});

export default validationSchema;
