import {useNavigation} from '@react-navigation/native';
import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';
import {Platform, StyleProp, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomIcon from '../components/ui/CustomIcon';

interface Props {
  title: string;
  subtitle?: string;

  rightAction?: () => void;
  rightActionIcon?: string;

  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function MainLayout({
  children,
  rightAction,
  rightActionIcon,
  subtitle,
  title,
  style,
}: Props) {
  const {top} = useSafeAreaInsets();
  const {canGoBack, goBack} = useNavigation();

  const spaceTop = Platform.OS === 'ios' ? 20 + top : top;
  const renderBackButton = () => (
    <TopNavigationAction
      icon={<CustomIcon name="arrow-back-outline" />}
      onPress={goBack}
    />
  );

  const RenderRightAction = () => {
    if (rightAction === undefined || rightActionIcon === undefined) {
      return null;
    }

    return (
      <TopNavigationAction
        onPress={rightAction}
        icon={<CustomIcon name={rightActionIcon} />}
      />
    );
  };

  return (
    <Layout style={[{paddingTop: spaceTop}, style]}>
      <TopNavigation
        title={title}
        subtitle={subtitle}
        alignment="center"
        accessoryLeft={canGoBack() ? renderBackButton : undefined}
        accessoryRight={() => <RenderRightAction />}
      />
      <Divider />

      <Layout style={{height: '100%'}}>{children}</Layout>
    </Layout>
  );
}
