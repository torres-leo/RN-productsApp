import {ProductMapper} from '@app/infrastructure/mappers/product.mapper';
import {tesloApi} from '@app/config/api/tesloApi';
import {TesloProduct} from '@app/infrastructure/interfaces/teslo-products.response';
import type {Product} from '@app/domain/entities/product';

export const getProducts = async (
  page: number = 1,
  limit: number = 20,
): Promise<Product[]> => {
  const offset = (page - 1) * limit;

  try {
    const {data} = await tesloApi.get<TesloProduct[]>(
      `/products?offset=${offset}&limit=${limit}`,
    );

    const products = data.map(tesloProduct =>
      ProductMapper.tesloProductToEntity(tesloProduct),
    );

    return products;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to retrive Products: ${error}`);
  }
};
