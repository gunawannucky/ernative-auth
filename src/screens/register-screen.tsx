import {KeyboardAvoidingScrollView} from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view';
import {SizedBox} from '@components/sized-box';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@routes/root-navigator';
import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
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
    length: {
      minimum: 8,
    },
    format: {
      pattern:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?]).{8,}/,
      message:
        'must contain at least one lowercase letter, one uppercase letter, and one symbol',
    },
  },
};

const RegisterScreen = () => {
  const theme = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [email, setEmail] = useState<string>('');
  const [emailErrors, setEmailErrors] = useState([]);
  const [password, setPassword] = useState<string>('');
  const [passwordErrors, setPasswordErrors] = useState([]);

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

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <KeyboardAvoidingScrollView contentContainerStyle={styles.scrollview}>
        <Text
          variant="displayMedium"
          style={[styles.text, {color: theme.colors.onBackground}]}>
          Register
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
          onPress={() =>
            navigation.navigate('OTP_SCREEN', {username: email, password})
          }>
          Register Now
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

export default RegisterScreen;
