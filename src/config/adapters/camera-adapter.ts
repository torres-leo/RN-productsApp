import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export class CameraAdapter {
  static async takePicture(): Promise<string[]> {
    const response = await launchCamera({
      mediaType: 'photo',
      quality: 1,
      cameraType: 'back',
    });

    if (response.assets && response.assets[0].uri) {
      return [response.assets[0].uri];
    }

    return [];
  }

  static async pickImagesFromGallery(): Promise<string[]> {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 5,
    });

    if (response.assets && response.assets.length > 0) {
      const images = response.assets.map(asset => asset.uri!);
      return images;
    }

    return [];
  }
}
