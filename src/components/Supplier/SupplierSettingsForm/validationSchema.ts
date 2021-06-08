import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  storageName: Yup.string().required('This field is required'),
  description: Yup.string().required('This field is required'),
});

export default validationSchema;
