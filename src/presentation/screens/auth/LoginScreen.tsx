import React, {useState} from 'react';
import {Button, Card, Input, Layout, Modal, Text} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, useColorScheme, useWindowDimensions} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import CustomIcon from '@app/presentation/components/ui/CustomIcon';
import {RootStackParams} from '@app/presentation/navigator/StackNavigator';
import {useAuthStore} from '@app/presentation/store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export default function LoginScreen({navigation}: Props) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {login} = useAuthStore();

  const {height} = useWindowDimensions();
  const colorScheme = useColorScheme();

  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }
    setIsLoading(true);

    const success = await login(form.email, form.password);
    setIsLoading(false);
    if (success) {
      return;
    }

    setModalVisible(true);
  };

  return (
    <>
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
              value={form.email}
              onChangeText={value => setForm({...form, email: value})}
              style={{marginBottom: 10}}
              accessoryLeft={<CustomIcon name="email-outline" />}
            />

            <Input
              placeholder="*******"
              status={colorScheme === 'dark' ? '' : 'info'}
              autoCapitalize="none"
              secureTextEntry
              value={form.password}
              onChangeText={value => setForm({...form, password: value})}
              style={{marginBottom: 10}}
              accessoryLeft={<CustomIcon name="lock-outline" />}
            />
          </Layout>

          <Layout style={{height: 20}} />

          <Layout style={{marginBottom: 20}}>
            <Button
              disabled={isLoading}
              onPress={onLogin}
              accessoryRight={
                <CustomIcon name="arrow-forward-outline" white />
              }>
              Login
            </Button>
          </Layout>

          <Layout style={[styles.createAccount]}>
            <Text>Don't you have an account?</Text>
            <Text
              category="s1"
              status="primary"
              onPress={() => navigation.navigate('RegisterScreen')}>
              Create one!
            </Text>
          </Layout>
        </ScrollView>
      </Layout>

      <Modal
        visible={modalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setModalVisible(false)}>
        <Card disabled={true}>
          <Text category="h6">Invalid Credentials</Text>
        </Card>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  createAccount: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    columnGap: 5,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
