import React, { useState } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import ImageView from 'react-native-image-viewing';
import { ShareHelper } from 'service/shareHelper';
import { Pressable } from 'shared/pressable';
import I18n from 'locales';
import { invoicesSelectors } from 'store/entities/invoices';
import { invoiceDetailsStyle as S } from '../style';

const QRCodeImage: React.FC = () => {
  const invoice = useSelector(invoicesSelectors.invoice)!;

  const [state, setState] = useState({
    isImageViewOpened: false,
    imageUrl: null,
  });

  const openImageView = (image: any) => () => setState(prev => ({ ...prev, imageUrl: image, isImageViewOpened: true }))

  const closeImageView = () => setState(prev => ({ ...prev, isImageViewOpened: false }))

  return (!!invoice?.code?.trim()) ? (
    <>
      <TouchableOpacity onPress={openImageView(invoice?.code)} style={S.qrImageContainer}>
        <Image source={{ uri: invoice?.code }} style={[S.image, S.qrImage]} />
      </TouchableOpacity>
      <ImageView
        visible={state.isImageViewOpened}
        images={[{ uri: invoice?.code }]}
        // FooterComponent={() => {
        //   return (
        //     <Pressable onPress={() => {
        //       ShareHelper.downloadImage({
        //         name: I18n.t('common.files.image', {
        //           number: ('INVOICE_' + invoice?.id),
        //         }), url: state.imageUrl!
        //       }, true);
        //     }} jc='center' ai='center' mb={80}>
        //       <Text style={S.downloadImageText}>{'Download Image'}</Text>
        //     </Pressable>
        //   )
        // }}
        imageIndex={0}
        onRequestClose={closeImageView}
      />
    </>
  ) : null;
};

export { QRCodeImage };
