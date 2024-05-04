import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { ResetError, loginThunk } from '../redux/authSlice';
import { AppDispatch, RootState } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '../utils/theme/colors';
import { Box, Button, Icon, Input, ScrollView } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const [show, setShow] = useState(false);

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(loginThunk({ email, password }));
  };

  useEffect(() => {
    dispatch(ResetError());
  }, []);

  return (
    <View style={styles.container}>
        <LottieView
          source={require('../assets/login.json')}
          autoPlay
          loop
          style={styles.lottieView}
        />
        <Text style={styles.title}>Login</Text>
        <Text style={styles.secondTitle}>Please Sign in to continue.</Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <Box style={styles.inputContainer}>
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
                      as={<MaterialIcons name="person" />}
                      size={5}
                      backgroundColor={colors.gray100}
                    />
                  }
                />
              </Box>
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
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
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
              {error && <Text style={styles.error}>{error.message}</Text>}

              <Button
                style={styles.button}
                onPress={() => handleSubmit()}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.buttonText}>Sign in</Text>
                )}
              </Button>
            </>
          )}
        </Formik>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>
            Don't have account?{' '}
            <Text style={{ fontWeight: 'bold' }}>Sign up</Text>
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
    flex: 1,
  },
  lottieView: {
    width: '100%',
    height: '40%',
    alignSelf: 'center',
    padding: 0,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 25,
    alignSelf: 'flex-start',
  },
  secondTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
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
  registerLink: {
    marginTop: 20,
    color: colors.gray900,
    alignSelf: 'center',
    textDecorationLine: 'none', // This removes the underline
  },
});

export default LoginScreen;
