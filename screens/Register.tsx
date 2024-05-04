import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { ResetError, registerThunk } from '../redux/authSlice';
import { AppDispatch, RootState } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/theme/colors';
import LottieView from 'lottie-react-native';
import { Box, Icon, Input } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

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
  const [show, setShow] = useState(false);
  const screenHeight = Dimensions.get('window').height;

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleRegister = (values: any) => {
    dispatch(registerThunk(values));
  };

  useEffect(() => {
    dispatch(ResetError());
  }, []);

  return (
    <View style={styles.container}>
        <LottieView
          source={require('../assets/register.json')}
          autoPlay
          loop
          style={styles.lottieView}
        />
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
              <Box style={styles.inputContainer}>
                <Input
                  value={values.username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  style={styles.input}
                  placeholder="Username"
                  autoCapitalize="none"
                  variant="unstyled"
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="person" />}
                      size={5}
                      backgroundColor={colors.gray100}
                    />
                  }
                />
              </Box>
              {errors.username && (
                <Text style={styles.error}>{errors.username}</Text>
              )}
              <Box style={{ ...styles.inputContainer, marginTop: 10 }}>
                <Input
                  style={styles.input}
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  variant="unstyled"
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="email" />}
                      size={5}
                      backgroundColor={colors.gray100}
                    />
                  }
                />
              </Box>
              {errors.email && <Text style={styles.error}>{errors.email}</Text>}
              <Box style={{ ...styles.inputContainer, marginTop: 10 }}>
                <Input
                  style={styles.input}
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  type={show ? 'text' : 'password'}
                  variant="unstyled"
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="lock" />}
                      size={5}
                      backgroundColor={colors.gray100}
                    />
                  }
                  InputRightElement={
                    <Pressable onPress={() => setShow(!show)}>
                      <Icon
                        as={
                          <MaterialIcons
                            name={show ? 'visibility' : 'visibility-off'}
                          />
                        }
                        size={5}
                        mr="2"
                        color="muted.400"
                      />
                    </Pressable>
                  }
                />
              </Box>
              {errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
              <Box style={{ ...styles.inputContainer, marginTop: 10 }}>
                <Input
                  style={styles.input}
                  placeholder="Confirm password"
                  value={values.confirm_password}
                  onChangeText={handleChange('confirm_password')}
                  onBlur={handleBlur('confirm_password')}
                  type={show ? 'text' : 'password'}
                  variant="unstyled"
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="lock" />}
                      size={5}
                      backgroundColor={colors.gray100}
                    />
                  }
                  InputRightElement={
                    <Pressable onPress={() => setShow(!show)}>
                      <Icon
                        as={
                          <MaterialIcons
                            name={show ? 'visibility' : 'visibility-off'}
                          />
                        }
                        size={5}
                        mr="2"
                        color="muted.400"
                      />
                    </Pressable>
                  }
                />
              </Box>
              {errors.confirm_password && (
                <Text style={styles.error}>{errors.confirm_password}</Text>
              )}
              {error && <Text style={styles.apiError}>{error.message}</Text>}
              <Button
                style={styles.button}
                onPress={() => handleSubmit()}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.buttonText}>Sign up</Text>
                )}
              </Button>
            </View>
          )}
        </Formik>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>
            Already have an account?{' '}
            <Text style={{ fontWeight: 'bold' }}>Sign in</Text>
          </Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    height: '100%',
  },
  lottieView: {
    width: '100%',
    height: '40%',
    alignSelf: 'center',
    padding: 0,
  },
  inputContainer: {
    width: '100%',
    height: 50,
    borderWidth: 0,
    borderRadius: 50,
    paddingHorizontal: 20,
    backgroundColor: colors.gray100,
    fontSize: 18,
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'left',
    marginLeft: 10,
  },
  apiError: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  loginLink: {
    marginTop: 20,
    color: colors.gray900,
    alignSelf: 'center',
    textDecorationLine: 'none',
  },
  button: {
    backgroundColor: colors.violet600,
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Register;
