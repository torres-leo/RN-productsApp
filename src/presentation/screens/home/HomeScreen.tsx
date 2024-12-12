import React from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';

import {getProducts} from '@app/actions/products/get-products';
import MainLayout from '@app/presentation/layouts/MainLayout';
import FullScreenLoader from '@app/presentation/components/ui/FullScreenLoader';
import {ProductList} from '@app/presentation/components/ui/products/ProductList';

export default function HomeScreen() {
  // const {isLoading, data: products = []} = useQuery({
  //   queryKey: ['products', 'infinite'],
  //   staleTime: 1000 * 60 * 60,
  //   queryFn: () => getProducts(),
  // });

  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60,
    initialPageParam: 1,
    queryFn: async params => await getProducts(params.pageParam),
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  return (
    <MainLayout
      title="Tesloshop - Products"
      subtitle="Administrative Application"
      // rightAction={() => {}}
      // rightActionIcon="plus-outline"
    >
      {isLoading ? (
        <FullScreenLoader />
      ) : (
        <ProductList
          products={data?.pages.flat() ?? []}
          fetchNextPage={fetchNextPage}
        />
      )}
    </MainLayout>
  );
}
