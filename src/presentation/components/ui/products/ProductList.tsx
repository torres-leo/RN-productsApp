import React, {useState} from 'react';
import {Layout, List} from '@ui-kitten/components';

import {Product} from '@app/domain/entities/product';
import ProductCard from './ProductCard';
import {RefreshControl} from 'react-native';

interface Props {
  products: Product[];

  fetchNextPage: () => void;
}

export const ProductList = ({products, fetchNextPage}: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPullToRefresh = async () => {
    setIsRefreshing(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsRefreshing(false);
  };

  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({item}) => <ProductCard product={item} />}
      ListFooterComponent={() => <Layout style={{height: 200}} />}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.7}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};
