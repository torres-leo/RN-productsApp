import React, {useRef} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Formik} from 'formik';
import {Button, Input, Layout} from '@ui-kitten/components';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import {ArrayGenders, ArraySizes} from '@app/config/constants/product.constant';
import {getProductById} from '@app/actions/products/get-product-by-id';
import {Product} from '@app/domain/entities/product';
import {RootStackParams} from '@app/presentation/navigator/StackNavigator';
import {updateCreateProduct} from '@app/actions/products/update-create-product';
import ButtonOptions from '@app/presentation/components/ui/products/ButtonOptions';
import CustomIcon from '@app/presentation/components/ui/CustomIcon';
import FullScreenLoader from '@app/presentation/components/ui/FullScreenLoader';
import MainLayout from '@app/presentation/layouts/MainLayout';
import ProductImages from '@app/presentation/components/ui/products/ProductImages';

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export default function ProductScreen({navigation, route}: Props) {
  const productIdRef = useRef(route.params.productId);
  const queryClient = useQueryClient();

  const {data: product, error} = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const mutation = useMutation({
    mutationFn: (data: Product) =>
      updateCreateProduct({...data, id: productIdRef.current}),
    onSuccess(data: Product) {
      productIdRef.current = data.id;
      queryClient.invalidateQueries({queryKey: ['products', 'infinite']});
      queryClient.invalidateQueries({queryKey: ['product', data.id]});
      // queryClient.setQueryData(['products', data.id], data.id); => This is the same of invalidateQueries, but we have to map images again
    },
  });

  if (error) {
    navigation.goBack();
  }

  if (!product) {
    return <FullScreenLoader />;
  }

  return (
    <Formik
      initialValues={product}
      onSubmit={values => mutation.mutate(values)}>
      {({handleChange, handleSubmit, values, setFieldValue}) => (
        <MainLayout title={values.title} subtitle={`$${values.price}`}>
          <ScrollView style={{flex: 1}}>
            <Layout
              style={{
                paddingTop: 10,
                alignItems: 'center',
              }}>
              <ProductImages images={values.images} />
            </Layout>

            <Layout style={styles.containerInputs}>
              <Input
                label="Title"
                value={values.title}
                onChangeText={handleChange('title')}
              />
              <Input
                label="Description"
                multiline
                numberOfLines={5}
                value={values.description}
                onChangeText={handleChange('description')}
              />
              <Input
                label="Slug"
                value={values.slug}
                onChangeText={handleChange('slug')}
              />
            </Layout>

            <Layout style={styles.containerInputsRow}>
              <Input
                label="Price"
                value={values.price.toString()}
                onChangeText={handleChange('price')}
                style={{flex: 1}}
                keyboardType="numeric"
              />
              <Input
                label="Stock"
                value={values.stock.toString()}
                onChangeText={handleChange('stock')}
                style={{flex: 1}}
                keyboardType="numeric"
              />
            </Layout>

            <ButtonOptions
              list={ArraySizes}
              fieldName="sizes"
              selectedValue={values.sizes}
              setFieldValue={setFieldValue}
            />

            <ButtonOptions
              list={ArrayGenders}
              fieldName="gender"
              selectedValue={values.gender}
              setFieldValue={setFieldValue}
            />

            <Button
              disabled={mutation.isPending}
              onPress={() => handleSubmit()}
              accessoryLeft={<CustomIcon name="save-outline" white />}
              style={{marginHorizontal: 10}}>
              Save
            </Button>

            <Layout style={{height: 200}} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  containerInputs: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    marginTop: 20,
    rowGap: 15,
  },
  containerInputsRow: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    gap: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  buttonGroup: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
});
