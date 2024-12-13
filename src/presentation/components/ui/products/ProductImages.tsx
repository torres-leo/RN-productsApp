import {Image, FlatList} from 'react-native';
import React from 'react';
import {FadeInImage} from '../FadeInImage';

interface Props {
  images: string[];
}

export default function ProductImages({images}: Props) {
  return (
    <>
      {images.length === 0 ? (
        <Image
          style={{width: 300, height: 300}}
          source={require('@app/assets/no-product-image.png')}
        />
      ) : (
        <FlatList
          data={images}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <FadeInImage
              uri={item}
              style={{width: 300, height: 300, marginHorizontal: 7}}
            />
          )}
        />
      )}
    </>
  );
}
