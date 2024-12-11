import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import {Icon, useTheme} from '@ui-kitten/components';

interface Props {
  name: string;
  color?: string;
  white?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function CustomIcon({color, name, white = false, style}: Props) {
  const theme = useTheme();

  if (white) {
    color = theme['color-info-100'];
  } else if (!white) {
    color = theme['text-basic-color'];
  } else {
    color = theme[color] ?? theme['text-basic-color'];
  }

  return <Icon name={name} fill={color} style={[styles.icon, style]} />;
}

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});
