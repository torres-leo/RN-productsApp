import {StyleSheet} from 'react-native';
import React from 'react';
import {Layout, Spinner} from '@ui-kitten/components';

export default function LoadingScreen() {
  return (
    <Layout style={[styles.container]}>
      <Spinner status="primary" size="large" />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
