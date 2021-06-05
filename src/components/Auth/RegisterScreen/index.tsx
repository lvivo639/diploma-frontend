import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { RootState } from '../../../common/types';
import { register } from '../../../store/user';
import messages from './messages';
import validationSchema from './validationSchema';

type FormType = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  password: string;
  passwordConfirm: string;
};

const RegisterScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state: RootState) => state.user);
  const intl = useIntl();

  const handleSubmit = async (values: FormType) => {
    dispatch(
      register(
        values.firstName,
        values.lastName,
        values.username,
        values.email,
        values.role,
        values.password,
      ),
    );
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
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                role: 'dropshipper',
                password: '',
                passwordConfirm: '',
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
                        messages.placeholderFirstName,
                      )}
                      name="firstName"
                      variant="outlined"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.firstName && errors.firstName}
                      error={Boolean(touched.firstName && errors.firstName)}
                    />
                  </Box>
                  <Box py={1}>
                    <TextField
                      fullWidth
                      placeholder={intl.formatMessage(
                        messages.placeholderLastName,
                      )}
                      name="lastName"
                      variant="outlined"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.lastName && errors.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                    />
                  </Box>
                  <Box py={1}>
                    <TextField
                      fullWidth
                      placeholder={intl.formatMessage(
                        messages.placeholderUsername,
                      )}
                      name="username"
                      variant="outlined"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.username && errors.username}
                      error={Boolean(touched.username && errors.username)}
                    />
                  </Box>
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
                  <Box py={1}>
                    <TextField
                      fullWidth
                      type="password"
                      name="passwordConfirm"
                      variant="outlined"
                      value={values.passwordConfirm}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.passwordConfirm && errors.passwordConfirm
                      }
                      error={Boolean(
                        touched.passwordConfirm && errors.passwordConfirm,
                      )}
                      placeholder={intl.formatMessage(
                        messages.placeholderPasswordConfirm,
                      )}
                    />
                  </Box>
                  <Box py={1}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={Boolean(touched.role && errors.role)}
                    >
                      <InputLabel id="role-label">
                        {intl.formatMessage(messages.placeholderRole)}
                      </InputLabel>
                      <Select
                        labelId="role-label"
                        id="role"
                        name="role"
                        value={values.role}
                        onChange={handleChange}
                        label="Age"
                      >
                        <MenuItem value="dropshipper">
                          {intl.formatMessage(messages.roleDropshipper)}
                        </MenuItem>
                        <MenuItem value="supplier">
                          {intl.formatMessage(messages.roleSupplier)}
                        </MenuItem>
                      </Select>
                      {touched.role && errors.role && (
                        <FormHelperText>{errors.role}</FormHelperText>
                      )}
                    </FormControl>
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
          <Typography>{intl.formatMessage(messages.haveAccount)}</Typography>

          <Link component={RouterLink} to="/login">
            {intl.formatMessage(messages.logIn)}
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterScreen;
