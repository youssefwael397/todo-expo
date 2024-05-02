import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { ResetError, registerThunk } from '../redux/authSlice';
import { AppDispatch, RootState } from '../redux/store';
import { useNavigation } from '@react-navigation/native';

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleRegister = (values: any) => {
    dispatch(registerThunk(values));
  };

  useEffect(()=>{
    dispatch(ResetError());
  },[])

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirm_password: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            <TextInput
              label="Username"
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              // error={errors.username ? true : false}
            />
            {errors.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}
            <TextInput
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              // error={errors.email ? true : false}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
            <TextInput
              label="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
              // error={errors.password ? true : false}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <TextInput
              label="Confirm Password"
              value={values.confirm_password}
              onChangeText={handleChange('confirm_password')}
              onBlur={handleBlur('confirm_password')}
              secureTextEntry
              // error={errors.confirm_password ? true : false}
            />
            {errors.confirm_password && (
              <Text style={styles.error}>{errors.confirm_password}</Text>
            )}
            {error && <Text style={styles.apiError}>{error.message}</Text>}
            <Button
              mode="contained"
              onPress={() => handleSubmit()}
              disabled={loading}
            >
              Register
            </Button>
          </View>
        )}
      </Formik>
      <Text
        style={styles.loginLink}
        onPress={() => navigation.navigate('Login')}
      >
        Already have an account? Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  apiError: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  loginLink: {
    marginTop: 20,
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Register;
