import {StyleSheet} from 'react-native';
import React from 'react';
import {Icon, useTheme} from '@ui-kitten/components';

interface Props {
  name: string;
  color?: string;
  white?: boolean;
}

export default function CustomIcon({color, name, white = false}: Props) {
  const theme = useTheme();

  if (white) {
    color = theme['color-info-100'];
  } else if (!white) {
    color = theme['text-basic-color'];
  } else {
    color = theme[color] ?? theme['text-basic-color'];
  }

  return <Icon name={name} fill={color} style={styles.icon} />;
}

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});
