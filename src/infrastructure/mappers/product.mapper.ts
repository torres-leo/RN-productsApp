import {API_URL} from '@app/config/api/tesloApi';
import {Product} from '@app/domain/entities/product';
import {TesloProduct} from '../interfaces/teslo-products.response';

export class ProductMapper {
  static tesloProductToEntity(tesloProduct: TesloProduct): Product {
    return {
      id: tesloProduct.id,
      description: tesloProduct.description,
      gender: tesloProduct.gender,
      price: tesloProduct.price,
      sizes: tesloProduct.sizes,
      slug: tesloProduct.slug,
      stock: tesloProduct.stock,
      tags: tesloProduct.tags,
      title: tesloProduct.title,
      images: tesloProduct.images.map(
        image => `${API_URL}/files/product/${image}`,
      ),
    };
  }
}
