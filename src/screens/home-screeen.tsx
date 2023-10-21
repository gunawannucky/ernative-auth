import AuthContext from '@modules/auth/auth-context';
import LottieView from 'lottie-react-native';
import React, {useCallback, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Button, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = () => {
  const theme = useTheme();
  const {setIsAuthenticated} = useContext(AuthContext);
  const handleLogout = useCallback(async () => {
    await EncryptedStorage.setItem('authenticated', JSON.stringify(false));
    setIsAuthenticated(false);
  }, [setIsAuthenticated]);
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.lottieWrapper}>
        <LottieView
          source={require('@assets/lottiefiles/intro.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button style={styles.button} mode="contained" onPress={handleLogout}>
          Logout
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  lottieWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 300,
    height: 300,
  },
  buttonWrapper: {
    padding: 32,
  },
  button: {borderRadius: 0},
});

export default HomeScreen;
