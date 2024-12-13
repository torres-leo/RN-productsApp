import {StyleSheet} from 'react-native';
import React from 'react';
import {FormikErrors} from 'formik';
import {Product} from '@app/domain/entities/product';
import {Button, ButtonGroup, useTheme} from '@ui-kitten/components';

interface Props {
  list: string[];
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean,
  ) => Promise<void | FormikErrors<Product>>;
  fieldName: string;
  selectedValue: string | string[] | null;
}

export default function ButtonOptions({
  list,
  fieldName,
  selectedValue,
  setFieldValue,
}: Props) {
  const theme = useTheme();

  return (
    <ButtonGroup size="small" style={[styles.buttonGroup]} appearance="outline">
      {list.map(item => {
        const isSelected = Array.isArray(selectedValue)
          ? selectedValue.includes(item)
          : selectedValue === item;

        const backgroundColorOnItem = isSelected
          ? theme['color-primary-200']
          : undefined;

        return (
          <Button
            key={item}
            style={{
              flex: 1,
              backgroundColor: backgroundColorOnItem,
            }}
            onPress={() =>
              setFieldValue(
                fieldName,
                Array.isArray(selectedValue)
                  ? selectedValue.includes(item)
                    ? selectedValue.filter(s => s !== item)
                    : [...selectedValue, item]
                  : item,
              )
            }>
            {item}
          </Button>
        );
      })}
    </ButtonGroup>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
});
