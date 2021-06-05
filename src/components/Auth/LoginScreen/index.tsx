import {
  Box,
  Button,
  CircularProgress,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { RootState } from '../../../common/types';
import { signIn } from './../../../store/user';
import messages from './messages';
import validationSchema from './validationSchema';

type FormType = {
  email: string;
  password: string;
};

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state: RootState) => state.user);

  const intl = useIntl();

  const handleSubmit = async (values: FormType) => {
    dispatch(signIn(values.email, values.password));
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
    >
      <Box border={1} p={3} width={500}>
        <Box py={2}>
          <Typography variant="h1">
            {intl.formatMessage(messages.title)}
          </Typography>
        </Box>
        <Box py={2}>
          <Formik
            initialValues={
              {
                email: '',
                password: '',
              } as FormType
            }
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => {
              return (
                <Form>
                  <Box py={1}>
                    <TextField
                      fullWidth
                      placeholder={intl.formatMessage(
                        messages.placeholderEmail,
                      )}
                      name="email"
                      variant="outlined"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.email && errors.email}
                      error={Boolean(touched.email && errors.email)}
                    />
                  </Box>
                  <Box py={1}>
                    <TextField
                      fullWidth
                      type="password"
                      name="password"
                      variant="outlined"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.password && errors.password}
                      error={Boolean(touched.password && errors.password)}
                      placeholder={intl.formatMessage(
                        messages.placeholderPassword,
                      )}
                    />
                  </Box>
                  {isLoading ? (
                    <CircularProgress />
                  ) : (
                    <Button variant="contained" color="primary" type="submit">
                      {intl.formatMessage(messages.buttonText)}
                    </Button>
                  )}
                  {error && (
                    <Box py={2}>
                      <Typography color="error">{error}</Typography>
                    </Box>
                  )}
                </Form>
              );
            }}
          </Formik>
        </Box>
        <Box py={2}>
          <Typography>
            {intl.formatMessage(messages.dontHaveAccount)}
          </Typography>

          <Link component={RouterLink} to="/register">
            {intl.formatMessage(messages.register)}
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginScreen;
