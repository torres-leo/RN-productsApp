import React from 'react';
import {Product} from '@app/domain/entities/product';
import {Card, Text} from '@ui-kitten/components';
import {Image, StyleSheet} from 'react-native';
import {FadeInImage} from '../FadeInImage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '@app/presentation/navigator/StackNavigator';

interface Props {
  product: Product;
}

export default function ProductCard({product}: Props) {
  const {title, images, id} = product;
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  console.log(id);

  const renderImage = () => {
    if (images.length === 0) {
      return (
        <Image
          source={require('@app/assets/no-product-image.png')}
          style={[styles.noImage]}
        />
      );
    }

    return <FadeInImage uri={images[0]} style={styles.productImage} />;
  };

  return (
    <Card
      style={[styles.container]}
      onPress={() => navigation.navigate('ProductScreen', {productId: id})}>
      {renderImage()}
      <Text style={[styles.title]} numberOfLines={2}>
        {title}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    margin: 3,
  },
  noImage: {
    width: '100%',
    height: '100%',
  },
  productImage: {
    flex: 1,
    height: 200,
    width: '100%',
  },
  title: {
    color: 'black',
    lineHeight: 18,
    textAlign: 'center',
  },
});
