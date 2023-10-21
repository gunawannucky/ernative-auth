import {SizedBox} from '@components/sized-box';
import {Toast, ToastType} from '@iqorlobanov/react-native-toast';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AuthStackParamList} from '@routes/root-navigator';
import {addSeconds} from 'date-fns';
import React, {useContext, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button, Text, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useCountdown, useDidUpdate} from 'rooks';
import EncryptedStorage from 'react-native-encrypted-storage';
import AuthContext from '@modules/auth/auth-context';

const VALID_OTP = '111111';
const CELL_COUNT = 6;
function convertSeconds(s: number) {
  let min: any = Math.floor(s / 60);
  let sec: any = s % 60;
  if (min < 10) {
    min = `0${min}`;
  }
  if (sec < 10) {
    sec = `0${sec}`;
  }

  return (
    <Text style={styles.countdown} variant="bodyLarge">
      {`(${min}:${sec})`}
    </Text>
  );
}

function Countdown(props: {endTime: Date; setResendable: Function}) {
  const {endTime, setResendable} = props;

  const count = useCountdown(endTime, {
    interval: 1000,
    onDown: () => {
      //
    },
    onEnd: () => {
      setResendable(true);
    },
  });
  return convertSeconds(count);
}

const OtpScreen = () => {
  const theme = useTheme();
  const route = useRoute<RouteProp<AuthStackParamList, 'OTP_SCREEN'>>();
  const username = route.params.username;
  const password = route.params.password;
  const {setUser} = useContext(AuthContext);

  const [otp, setOtp] = useState('');
  const [resendable, setResendable] = useState(false);
  const [endTime, setEndTime] = useState(addSeconds(new Date(), 30));

  useDidUpdate(async () => {
    if (otp.length === CELL_COUNT) {
      if (otp === VALID_OTP) {
        await EncryptedStorage.setItem(
          'user',
          JSON.stringify({username, password}),
        );
        setUser({username, password});
        Toast.show({
          title: 'Register Success',
          description: 'Your account is ready to Login.',
          type: ToastType.SUCCESS,
          visibilityTime: 5000,
        });
      } else {
        Toast.show({
          title: 'Wrong OTP Entered',
          description: "The OTP you've entered is incorrect. Please try again.",
          type: ToastType.ERROR,
          visibilityTime: 5000,
        });
        setOtp('');
      }
    }
  }, [otp]);

  const cells = Array.apply(null, Array(CELL_COUNT)).map((_, index) => {
    const activeCell = index === otp.length;
    return (
      <View
        key={`${index}cell`}
        style={[
          styles.cell,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            borderColor: activeCell
              ? theme.colors.primary
              : theme.colors.primary,
            borderWidth: activeCell ? 3 : 1,
          },
        ]}>
        <Text variant="headlineSmall">
          {activeCell ? '|' : otp[index] ?? ''}
        </Text>
      </View>
    );
  });

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <SizedBox height={64} />
      <Text
        variant="displayMedium"
        style={[styles.text, {color: theme.colors.onBackground}]}>
        Enter OTP
      </Text>
      <SizedBox height={32} />
      <View style={styles.root}>
        {cells}
        <TextInput
          keyboardType="number-pad"
          autoFocus
          disableFullscreenUI
          caretHidden={true}
          spellCheck={false}
          autoCorrect={false}
          blurOnSubmit={false}
          clearButtonMode="never"
          autoCapitalize="characters"
          underlineColorAndroid="transparent"
          maxLength={CELL_COUNT}
          value={otp}
          onChangeText={text => setOtp(text)}
          style={styles.textInput}
        />
      </View>
      <SizedBox height={32} />
      <Countdown endTime={endTime} setResendable={setResendable} />
      <Button
        disabled={!resendable}
        style={styles.button}
        onPress={() => {
          setEndTime(addSeconds(new Date(), 30));
          setResendable(false);
        }}>
        Resend OTP
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  text: {
    fontWeight: '700',
  },
  root: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textInput: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.015,
    fontSize: 1,
  },
  cell: {
    height: 45,
    width: 45,
    borderWidth: 1,

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 45 / 2,
  },
  countdown: {textAlign: 'center'},
  button: {borderRadius: 0},
});

export default OtpScreen;
