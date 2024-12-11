import React, {useState} from 'react';
import {Button, Modal, Card, Input, Layout, Text} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {StyleSheet, useColorScheme, useWindowDimensions} from 'react-native';

import CustomIcon from '@app/presentation/components/ui/CustomIcon';
import {RootStackParams} from '@app/presentation/navigator/StackNavigator';
import {useAuthStore} from '@app/presentation/store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export default function RegisterScreen({navigation}: Props) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const {height} = useWindowDimensions();
  const colorScheme = useColorScheme();

  const {register} = useAuthStore();

  const onRegister = async () => {
    if (
      form.email.length === 0 ||
      form.password.length === 0 ||
      form.fullName.length === 0
    ) {
      return;
    }
    setIsLoading(true);

    const success = await register(form.email, form.password, form.fullName);
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
          <Layout style={{paddingTop: height * 0.31}}>
            <Text category="h1">Create account</Text>
          </Layout>

          <Layout style={{marginTop: 15}}>
            <Input
              placeholder="Full name"
              status={colorScheme === 'dark' ? '' : 'info'}
              style={{marginBottom: 10}}
              accessoryLeft={<CustomIcon name="person-outline" />}
              value={form.fullName}
              onChangeText={value => setForm({...form, fullName: value})}
            />

            <Input
              placeholder="eg. test@google.com"
              status={colorScheme === 'dark' ? '' : 'info'}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{marginBottom: 10}}
              accessoryLeft={<CustomIcon name="email-outline" />}
              value={form.email}
              onChangeText={value => setForm({...form, email: value})}
            />

            <Input
              placeholder="*******"
              status={colorScheme === 'dark' ? '' : 'info'}
              autoCapitalize="none"
              secureTextEntry
              style={{marginBottom: 10}}
              accessoryLeft={<CustomIcon name="lock-outline" />}
              value={form.password}
              onChangeText={value => setForm({...form, password: value})}
            />
          </Layout>

          <Layout style={{height: 20}} />

          <Layout style={{marginBottom: 20}}>
            <Button
              disabled={isLoading}
              onPress={onRegister}
              accessoryRight={
                <CustomIcon name="arrow-forward-outline" white />
              }>
              Sign Up
            </Button>
          </Layout>

          <Layout style={[styles.createAccount]}>
            <Text>Do you have an account?</Text>
            <Text
              category="s1"
              status="primary"
              onPress={() => navigation.goBack()}>
              Sign In!
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
