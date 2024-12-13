import {tesloApi} from '@app/config/api/tesloApi';
import {Product} from '@app/domain/entities/product';
import {isAxiosError} from 'axios';

const uploadImage = async (image: string) => {
  const formData = new FormData();

  formData.append('file', {
    uri: image,
    type: 'image/jpeg',
    name: image.split('/').pop(),
  });

  const {data} = await tesloApi.post<{image: string}>(
    '/files/product',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data.image;
};

const prepareImages = async (images: string[]) => {
  const fileImages = images.filter(image => image.includes('file://'));
  const currentImages = images.filter(image => !image.includes('file://'));

  if (fileImages.length > 0) {
    const uploadPromises = fileImages.map(img => uploadImage(img));
    const uploadedImages = await Promise.all(uploadPromises);
    currentImages.push(...uploadedImages);
  }

  return currentImages.map(image => image.split('/').pop());
};

export const updateCreateProduct = (product: Partial<Product>) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 1 : Number(product.price);

  if (product.id && product.id !== 'new') {
    return updateProduct(product);
  }

  return createProduct(product);
};

const updateProduct = async (product: Partial<Product>) => {
  const {id, images = [], ...rest} = product;

  try {
    const checkedImages = await prepareImages(images);
    const {data} = await tesloApi.patch(`/products/${id}`, {
      images: checkedImages,
      ...rest,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    }

    console.log(error);
    throw new Error(
      `Error updating product "${id} - ${product.title}":\n ${error}`,
    );
  }
};

const createProduct = async (product: Partial<Product>) => {
  const {id, images = [], ...rest} = product;

  try {
    const checkedImages = await prepareImages(images);
    const {data} = await tesloApi.post('/products', {
      images: checkedImages,
      ...rest,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    }

    console.log(error);
    throw new Error(
      `Error creating product "${id} - ${product.title}":\n ${error}`,
    );
  }
};
