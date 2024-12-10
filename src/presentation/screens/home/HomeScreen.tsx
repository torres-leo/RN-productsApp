import React from 'react';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import {globalStyles} from '@/config/theme/global-styles';

export default function HomeScreen() {
  const handleLogout = () => {
    console.log('Logout');
  };

  return (
    <Layout style={[globalStyles.containerCenter]}>
      <Text>HomeScreen</Text>

      <Button accessoryLeft={<Icon name="facebook" />} onPress={handleLogout}>
        Logout
      </Button>
    </Layout>
  );
}
