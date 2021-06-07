import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required'),
  description: Yup.string().required('This field is required'),
  oldPrice: Yup.number(),
  price: Yup.number().required(),
});

export default validationSchema;
