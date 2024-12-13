import React, {useState} from 'react';
import {Layout, List} from '@ui-kitten/components';
import {useQueryClient} from '@tanstack/react-query';

import {Product} from '@app/domain/entities/product';
import {RefreshControl} from 'react-native';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];

  fetchNextPage: () => void;
}

export const ProductList = ({products, fetchNextPage}: Props) => {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPullToRefresh = async () => {
    setIsRefreshing(true);

    await new Promise(resolve => setTimeout(resolve, 500));
    queryClient.invalidateQueries({queryKey: ['products', 'infinite']});

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
