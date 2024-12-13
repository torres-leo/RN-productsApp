import {tesloApi} from '@app/config/api/tesloApi';
import {Gender, Product} from '@app/domain/entities/product';
import {TesloProduct} from '@app/infrastructure/interfaces/teslo-products.response';
import {ProductMapper} from '@app/infrastructure/mappers/product.mapper';

const emptyProduct: Product = {
  id: '',
  description: '',
  title: 'New Product',
  slug: '',
  gender: Gender.Unisex,
  stock: 0,
  price: 0,
  images: [],
  sizes: [],
  tags: [],
};

export const getProductById = async (id: string): Promise<Product> => {
  if (id === 'new') {
    return emptyProduct;
  }

  try {
    const {data} = await tesloApi.get<TesloProduct>(`/products/${id}`);

    return ProductMapper.tesloProductToEntity(data);
  } catch (error) {
    console.log(error);
    throw new Error(`Can't retrieve product with ID: ${id}`);
  }
};
