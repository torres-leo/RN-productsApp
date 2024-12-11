import React from 'react';
import {Button, Layout, Text} from '@ui-kitten/components';
import {globalStyles} from '@app/config/theme/global-styles';
import {useAuthStore} from '@app/presentation/store/auth/useAuthStore';
import CustomIcon from '@app/presentation/components/ui/CustomIcon';

export default function HomeScreen() {
  const {logout} = useAuthStore();

  return (
    <Layout style={[globalStyles.containerCenter]}>
      <Text>HomeScreen</Text>

      <Button
        accessoryRight={
          <CustomIcon
            name="log-out-outline"
            style={{transform: [{rotateX: '45deg'}]}}
          />
        }
        onPress={logout}>
        Logout
      </Button>
    </Layout>
  );
}
