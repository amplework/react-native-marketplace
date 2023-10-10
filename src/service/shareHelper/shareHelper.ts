import { Alert, PermissionsAndroid, Platform } from 'react-native';
// import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment-timezone';
import { isIOS } from 'utils/device';

type SharePDFOptions = {
  name: string;
  url: string;
};

// Addressed IOS base64 file share issue in WhatsApp and Gmail apps
// https://react-native-share.github.io/react-native-share/docs/share-remote-file
const sharePdf = async ({ name, url }: SharePDFOptions) => {
  if (isIOS) {
    const path = `${RNFetchBlob.fs.dirs.DocumentDir}/${name}.pdf`;
    const Blob = RNFetchBlob.config({ fileCache: true, path });

    const response = await Blob.fetch('GET', url);
    const filePath = response.path();

    await Share.open({
      title: name,
      url: filePath,
      type: 'application/jpeg',
    });

    await RNFS.unlink(filePath);
  } else {
    const Blob = RNFetchBlob.config({ fileCache: true });

    const response = await Blob.fetch('GET', url);
    const filePath = response.path();
    const base64Data = await response.readFile('base64');

    await Share.open({
      title: name,
      filename: name,
      url: `data:application/pdf;base64,${base64Data}`,
    });

    await RNFS.unlink(filePath);
  }
};

const shareImage = async ({ name, url }: SharePDFOptions, isBase64Data?: boolean) => {
  if (isIOS) {
    const path = `${RNFetchBlob.fs.dirs.DocumentDir}/${name}.jpeg`;
    const Blob = RNFetchBlob.config({ fileCache: true, path });

    const response = await Blob.fetch('GET', url);
    const filePath = response.path();

    await Share.open({
      title: name,
      url: filePath,
      type: 'application/jpeg',
    });

    await RNFS.unlink(filePath);
  } else {
    if (!isBase64Data) {
      const Blob = RNFetchBlob.config({ fileCache: true });
  
      const response = await Blob.fetch('GET', url);
      const filePath = response.path();
      const base64Data = await response.readFile('base64');
  
      await Share.open({
        title: name,
        filename: name,
        url: `data:application/pdf;base64,${base64Data}`, // data:image/png;base64
      });
  
      await RNFS.unlink(filePath);
    } else {
      await Share.open({
        title: name,
        filename: name,
        url: url,
      });
    }
  }
};

export const ShareHelper = {
  sharePdf,
  shareImage
};
