import I18n from 'locales';
import { Alert } from 'react-native';

interface IAlert {
  entity?: string;
  message?: string | null;
}

interface ICreation extends IAlert {
  onCreate: () => void;
}

const creation = ({ entity, message, onCreate }: ICreation) =>
  Alert.alert(
    I18n.t('common.warning'),
    message || I18n.t('common.alerts.creation', { entity }),
    [
      {
        text: I18n.t('common.cancel'),
      },
      {
        text: I18n.t('common.confirm'),
        onPress: onCreate,
      },
    ],
  );

interface IEditing extends IAlert {
  onEdit: () => void;
}

const editing = ({ entity, message, onEdit }: IEditing) =>
  Alert.alert(
    I18n.t('common.warning'),
    message || I18n.t('common.alerts.editing', { entity }),
    [
      {
        text: I18n.t('common.cancel'),
      },
      {
        text: I18n.t('common.confirm'),
        onPress: onEdit,
      },
    ],
  );

interface IDeletion extends IAlert {
  onDelete: () => void;
}

const deletion = ({ entity, message, onDelete }: IDeletion) =>
  Alert.alert(
    I18n.t('common.warning'),
    message ||
      I18n.t('common.alerts.deletion', { entity: entity?.toLowerCase() }),
    [
      {
        text: I18n.t('common.cancel'),
      },
      {
        text: I18n.t('common.delete'),
        onPress: onDelete,
        style: 'destructive',
      },
    ],
  );

interface IBlock extends IAlert {
  onBlock: () => void;
}

const blockClient = ({ entity, message, onBlock }: IBlock) =>
  Alert.alert(
    I18n.t('common.warning'),
    message ||
      I18n.t('common.alerts.blockClient', { entity: entity?.toLowerCase() }),
    [
      {
        text: I18n.t('common.cancel'),
      },
      {
        text: I18n.t('common.block'),
        onPress: onBlock,
        style: 'destructive',
      },
    ],
  );

const blockProvider = ({ entity, message, onBlock }: IBlock) =>
  Alert.alert(
    I18n.t('common.warning'),
    message ||
      I18n.t('common.alerts.blockProvider', { entity: entity?.toLowerCase() }),
    [
      {
        text: I18n.t('common.cancel'),
      },
      {
        text: I18n.t('common.block'),
        onPress: onBlock,
        style: 'destructive',
      },
    ],
  );

const info = (message: string, title = '') => Alert.alert(title, message);

const comingSoon = () => Alert.alert(I18n.t('common.alerts.comingSoon'));

interface ISending {
  entity: string;
  recipient: string;
  onSend: () => void;
}

const sending = ({ entity, recipient, onSend }: ISending) =>
  Alert.alert(
    I18n.t('common.warning'),
    I18n.t('common.alerts.sending', { entity, recipient }),
    [
      {
        text: I18n.t('common.cancel'),
      },
      {
        text: I18n.t('common.send'),
        onPress: onSend,
      },
    ],
  );

interface IConfirmation {
  message: string;
  onConfirm: () => void;
}

const confirmation = ({ message, onConfirm }: IConfirmation) =>
  Alert.alert(I18n.t('common.warning'), message, [
    {
      text: I18n.t('common.cancel'),
    },
    {
      text: I18n.t('common.confirm'),
      onPress: onConfirm,
    },
  ]);

export const alert = {
  creation,
  editing,
  info,
  deletion,
  comingSoon,
  sending,
  confirmation,
  blockClient,
  blockProvider,
};
