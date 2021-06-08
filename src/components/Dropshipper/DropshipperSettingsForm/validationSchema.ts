import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  telegramUsername: Yup.string().required('This field is required'),
  phoneNumber: Yup.string().required('This field is required'),
  cardNumber: Yup.string().required('This field is required'),
});

export default validationSchema;
