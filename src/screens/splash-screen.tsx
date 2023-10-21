import React from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {Text, useTheme} from 'react-native-paper';

const SplashScreen = () => {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <LottieView
        source={require('@assets/lottiefiles/welcome.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Text style={styles.text}>ERNATIVE</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 120,
    height: 120,
  },
  text: {
    fontSize: 25,
    fontWeight: '700',
  },
});

export default SplashScreen;
