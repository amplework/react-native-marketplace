import React, { useState } from 'react';
import { FlatList, Image, Text } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { useSelector } from 'react-redux';
import { Pressable } from 'shared/pressable';
import { invoicesSelectors } from 'store/entities/invoices';
import { ShareHelper } from 'service/shareHelper';
import I18n, { translations } from 'locales';

import { invoiceDetailsStyle as S } from '../style';
import { estimatesSelectors } from 'store/entities/estimates';

const ImagesList: React.FC = () => {
  const estimate = useSelector(estimatesSelectors.estimate)!;

  const [isImageViewOpened, setImageViewOpened] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);

  const openImageView = (index: number, image: any) => () => {
    setImageUrl(image);
    setSelectedImageIndex(index);
    setImageViewOpened(true);
  };

  const closeImageView = () => {
    setSelectedImageIndex(-1);
    setImageViewOpened(false);
  };

  const mappedImages = estimate.images.map((image) => ({ uri: image.url }));

  return estimate.images.length ? (
    <>
      <ImageView
        visible={isImageViewOpened}
        images={mappedImages}
        // FooterComponent={() => {
        //   return (
        //     <Pressable onPress={() => {
        //       ShareHelper.downloadImage({
        //         name: I18n.t('common.files.image', {
        //           number: imageUrl?.id,
        //         }), url: imageUrl?.url
        //       }, false);
        //       // ShareHelper.shareImage({ name: I18n.t('common.files.image', {
        //       //   number: imageUrl?.id,
        //       // }), url: imageUrl?.url });
        //       // // downloadPdf();
        //     }} jc='center' ai='center' mb={80}>
        //       <Text style={S.downloadImageText}>Download Image</Text>
        //     </Pressable>
        //   )
        // }}
        imageIndex={selectedImageIndex}
        onRequestClose={closeImageView}
      />
      <FlatList
        data={estimate.images}
        keyExtractor={(image) => image.id.toString()}
        horizontal
        renderItem={({ item: image, index }) => (
          <Pressable onPress={openImageView(index, image)} r={5} mr={8}>
            <Image source={{ uri: image.url }} style={S.image} />
          </Pressable>
        )}
        style={S.imagesList}
        showsHorizontalScrollIndicator={false}
      />
    </>
  ) : null;
};

export { ImagesList };
