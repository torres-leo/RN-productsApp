import React from 'react';

import {Button} from '@ui-kitten/components';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import CustomIcon from './CustomIcon';

interface Props {
  style?: StyleProp<ViewStyle>;
  iconName: string;
  onPress: () => void;
}

export default function FAB({style, iconName, onPress}: Props) {
  return (
    <Button
      style={[styles.button, style]}
      accessoryLeft={<CustomIcon name={iconName} white />}
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.4,
    textShadowRadius: 10,
    elevation: 3,
    borderRadius: 13,
  },
});
