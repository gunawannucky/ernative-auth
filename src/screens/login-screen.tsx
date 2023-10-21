import {KeyboardAvoidingScrollView} from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view';
import {SizedBox} from '@components/sized-box';
import {Toast, ToastType} from '@iqorlobanov/react-native-toast';
import AuthContext from '@modules/auth/auth-context';
import React, {useCallback, useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDidUpdate} from 'rooks';
import validate from 'validate.js';

const emailConstraint = {
  email: {
    presence: {allowEmpty: false},
    email: true,
  },
};

const passwordConstraints = {
  password: {
    presence: {allowEmpty: false},
  },
};

const LoginScreen = () => {
  const theme = useTheme();

  const [email, setEmail] = useState<string>('');
  const [emailErrors, setEmailErrors] = useState([]);
  const [password, setPassword] = useState<string>('');
  const [passwordErrors, setPasswordErrors] = useState([]);
  const {setIsAuthenticated, setUser} = useContext(AuthContext);

  const validateEmail = useCallback(() => {
    const validationErrors = validate({email}, emailConstraint, {
      format: 'flat',
    });
    if (validationErrors) {
      setEmailErrors(validationErrors);
    } else {
      setEmailErrors([]);
    }
  }, [email]);

  useDidUpdate(() => {
    validateEmail();
  }, [email]);

  const validatePassword = useCallback(() => {
    const validationErrors = validate({password}, passwordConstraints, {
      format: 'flat',
    });
    if (validationErrors) {
      setPasswordErrors(validationErrors);
    } else {
      setPasswordErrors([]);
    }
  }, [password]);

  useDidUpdate(() => {
    validatePassword();
  }, [password]);

  const handleLogin = useCallback(async () => {
    try {
      const user = await EncryptedStorage.getItem('user');
      if (user) {
        const credentials = JSON.parse(user);
        if (
          email === credentials.username &&
          password === credentials.password
        ) {
          await EncryptedStorage.setItem('authenticated', JSON.stringify(true));
          setIsAuthenticated(true);
        } else {
          throw Error();
        }
      } else {
        setUser(undefined);
      }
    } catch (error) {
      Toast.show({
        title: 'Login Error',
        description:
          "Email or Password you've entered is incorrect. Please try again.",
        type: ToastType.ERROR,
        visibilityTime: 5000,
      });
    }
  }, [email, password, setIsAuthenticated, setUser]);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <KeyboardAvoidingScrollView contentContainerStyle={styles.scrollview}>
        <Text
          variant="displayMedium"
          style={[styles.text, {color: theme.colors.onBackground}]}>
          Login
        </Text>
        <SizedBox height={32} />
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          value={email}
          onChangeText={text => setEmail(text)}
          label={'Email'}
          error={emailErrors.length > 0}
        />
        <SizedBox height={8} />
        {emailErrors.map((item, index) => {
          return (
            <Text
              variant="bodySmall"
              style={{color: theme.colors.error}}
              key={`${index}emailError`}>
              {`• ${item}`}
            </Text>
          );
        })}
        <SizedBox height={8} />
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
          label={'Password'}
          error={passwordErrors.length > 0}
        />
        <SizedBox height={8} />
        {passwordErrors.map((item, index) => {
          return (
            <Text
              variant="bodySmall"
              style={{color: theme.colors.error}}
              key={`${index}passwordError`}>
              {`• ${item}`}
            </Text>
          );
        })}
        <SizedBox height={16} />
        <Button
          disabled={
            email === '' ||
            password === '' ||
            emailErrors.length > 0 ||
            passwordErrors.length > 0
          }
          mode="contained"
          style={styles.buttonStyle}
          labelStyle={styles.buttonLabelStyle}
          onPress={handleLogin}>
          Login Now
        </Button>
      </KeyboardAvoidingScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {flexGrow: 1, justifyContent: 'center', paddingHorizontal: 16},
  text: {
    fontWeight: '700',
  },
  buttonStyle: {
    borderRadius: 0,
  },
  buttonLabelStyle: {
    fontSize: 18,
  },
});

export default LoginScreen;
