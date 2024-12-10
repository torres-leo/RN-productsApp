import React from 'react';
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, useColorScheme, useWindowDimensions} from 'react-native';

export default function LoginScreen() {
  const {height} = useWindowDimensions();
  const colorScheme = useColorScheme();

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.35}}>
          <Text category="h1">Login</Text>
        </Layout>

        <Layout style={{marginTop: 30}}>
          <Input
            placeholder="eg. test@google.com"
            status={colorScheme === 'dark' ? '' : 'info'}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{marginBottom: 10}}
          />

          <Input
            placeholder="*******"
            status={colorScheme === 'dark' ? '' : 'info'}
            autoCapitalize="none"
            secureTextEntry
            style={{marginBottom: 10}}
          />
        </Layout>

        <Layout style={{height: 20}} />

        <Layout style={{marginBottom: 20}}>
          <Button onPress={() => {}} appearance="">
            Login
          </Button>
        </Layout>

        <Layout style={[styles.createAccount]}>
          <Text>Don't you have an account?</Text>
          <Text category="s1" status="primary" onPress={() => {}}>
            Create one!
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  createAccount: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    columnGap: 5,
  },
});
