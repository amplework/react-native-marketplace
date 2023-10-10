import { MAX_INVOICE_IMAGES } from 'components/invoices/helpers/constants';
import React from 'react';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { InvoiceImage, isCloudImage } from 'types/invoices';

import { styles } from '../style';
import { FilePickerButton } from './filePickerButton';

interface Props {
  data: InvoiceImage[];
  onRemove: (image: InvoiceImage) => () => void;
  onPick: () => void;
}

const ImagesList: React.FC<Props> = ({ data, onPick, onRemove }) => (
  <FlatList
    data={data}
    keyExtractor={(image) => (isCloudImage(image) ? `${image.id}` : image.path)}
    horizontal
    renderItem={({ item: image }) => (
      <Box r={5} mr={8}>
        <Image
          source={{ uri: isCloudImage(image) ? image.url : image.path }}
          style={styles.image}
        />
        <TouchableOpacity style={styles.cancelButton} onPress={onRemove(image)}>
          <Icon src={require('assets/global/cancelRed.png')} size={20} />
        </TouchableOpacity>
      </Box>
    )}
    ListFooterComponent={() =>
      data.length < MAX_INVOICE_IMAGES ? (
        <FilePickerButton onPick={onPick} />
      ) : null
    }
    bounces={!!data.length}
    style={styles.imagesList}
    showsHorizontalScrollIndicator={false}
  />
);

export { ImagesList };
