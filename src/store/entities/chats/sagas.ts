import { PayloadAction } from '@reduxjs/toolkit';
import { ChatsApi } from 'api/chats';
import { SubClientsProviderApi } from 'api/subClients';
import { t, translations } from 'locales';
import { all, call, debounce, fork, put, takeEvery } from 'redux-saga/effects';
import { Navigator } from 'service/navigator';
import { toast } from 'shared/toast';
import {
  ConnectExistingClient,
  CreateChatAction,
  CreateMessageRequest,
  DeleteChatAction,
  GetChatsRequest,
  GetMessagesRequest,
} from 'types/chats';

import {
  confirmRequestNewClientInChat,
  confirmRequestNewClientInChatFailure,
  confirmRequestNewClientInChatSuccess,
  connectExistingClientInChat,
  connectExistingClientInChatChatFailure,
  connectExistingClientInChatSuccess,
  createChat,
  createChatFailure,
  createChatSuccess,
  createMessage,
  createMessageFailure,
  createMessageSuccess,
  deleteChat,
  deleteChatFailure,
  deleteChatSuccess,
  deleteMessage,
  deleteMessageFailure,
  deleteMessageSuccess,
  getChat,
  getChatFailure,
  getChats,
  getChatsFailure,
  getChatsSuccess,
  getChatSuccess,
  getMessages,
  getMessagesFailure,
  getMessagesSuccess,
  getUnreadChatsDetails,
  getUnreadChatsDetailsFailure,
  getUnreadChatsDetailsSuccess,
  loadMoreChats,
  loadMoreChatsFailure,
  loadMoreChatsSuccess,
  loadMoreMessages,
  loadMoreMessagesFailure,
  loadMoreMessagesSuccess,
  readMessage,
  readMessageFailure,
  readMessageSuccess,
  requestNewClientModal,
  updateClientModal,
} from './slice';

function* handleGetChats(action: PayloadAction<GetChatsRequest>) {  
  try {
    const { data } = yield call(ChatsApi.getChats, action.payload);
    
    yield put(getChatsSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(getChatsFailure());
  }
}

function* handleLoadMoreChats(action: PayloadAction<GetChatsRequest>) {
  try {
    const { data } = yield call(ChatsApi.getChats, action.payload);

    yield put(loadMoreChatsSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(loadMoreChatsFailure());
  }
}

function* handleCreateChat({ payload }: PayloadAction<CreateChatAction>) {  
  try {
    const { data } = yield call(ChatsApi.createChat, payload.participantId);

    if (payload.onSuccess) {
      yield payload.onSuccess(data);
    }

    yield put(getChats({ query: payload.query }));
    yield put(createChatSuccess());
  } catch (error) {
    toast.info(t(translations.common.errors.action));

    yield put(createChatFailure());
  }
}

function* handleDeleteChat({ payload }: PayloadAction<DeleteChatAction>) {
  try {
    yield call(ChatsApi.deleteChat, payload.id);

    toast.info(
      t(translations.common.messages.deletion, {
        entity: t(translations.common.entities.chat),
      }),
    );

    Navigator.goBack();

    yield put(getChats({ query: payload.query }));
    yield put(deleteChatSuccess());
  } catch (error) {
    toast.info(
      t(translations.common.errors.process, {
        process: t(translations.common.processes.delete),
        entity: t(translations.common.entities.chat),
      }),
    );

    yield put(deleteChatFailure());
  }
}

function* handleGetChat(action: PayloadAction<number>) {  
  try {
    const { data } = yield call(ChatsApi.getChat, action.payload);    

    yield put(getChatSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(getChatFailure());
  }
}

function* handleGetMessages({ payload }: PayloadAction<GetMessagesRequest>) {
  try {
    const { data } = yield call(ChatsApi.getMessages, payload);

    yield put(getMessagesSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(getMessagesFailure());
  }
}

function* handleLoadMoreMessages({
  payload,
}: PayloadAction<GetMessagesRequest>) {
  try {
    const { data } = yield call(ChatsApi.getMessages, payload);

    yield put(loadMoreMessagesSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(loadMoreMessagesFailure());
  }
}

function* handleCreateMessage({
  payload,
}: PayloadAction<CreateMessageRequest>) {
  try {
    const { data } = yield call(ChatsApi.createMessage, payload);

    yield put(
      createMessageSuccess({ message: data, messageId: payload.messageId }),
    );
  } catch (error) {
    toast.info(t(translations.chats.errors.create));

    yield put(createMessageFailure(payload));
  }
}

function* handleReadMessage({ payload }: PayloadAction<number>) {
  try {
    yield call(ChatsApi.readMessage, payload);

    yield put(readMessageSuccess());
  } catch (error) {
    yield put(readMessageFailure());
  }
}

function* handleDeleteMessage({ payload }: PayloadAction<number>) {
  try {
    yield call(ChatsApi.deleteMessage, payload);

    yield put(deleteMessageSuccess(payload));
  } catch (error) {
    toast.info(
      t(translations.chats.errors.deleteMessage),
    );

    yield put(deleteMessageFailure());
  }
}

function* handleGetUnreadChatsDetails() {
  try {
    const { data } = yield call(ChatsApi.getUnreadChatsDetails);

    yield put(getUnreadChatsDetailsSuccess(data));
  } catch (error) {
    yield put(getUnreadChatsDetailsFailure());
  }
}

function* confirmRequestNewClient(action: any) {
  try {    
    const { client, clientId, chatId } = action.payload;
    const { data } = yield call(SubClientsProviderApi.createSubClient, client);
    yield call(SubClientsProviderApi.connectClient, {
      id: data.id,
      clientId,
      shouldCopyData: true,
    });

    yield put(getChat(chatId))
    yield put(getMessages({id: chatId}))
    yield put(requestNewClientModal({
      show: false,
    }))

    yield put(confirmRequestNewClientInChatSuccess())

  } catch (error: any) {    
    toast.info(error?.message);
    yield put(confirmRequestNewClientInChatFailure())
    yield put({ type: 'CONFIRM_REQUEST_NEW_CLIENT_FAILED' });
  }
}

function* handleConnectExistingClientInChat(action: any) {
  try {        
    yield call(SubClientsProviderApi.connectClient, {
      id: action?.payload?.id,
      clientId: action?.payload?.clientId,
      shouldCopyData: action?.payload?.shouldCopyData,
    });

    yield put(getChat(action?.payload?.chatId))
    yield put(getMessages({id: action?.payload?.chatId}))
    yield put(updateClientModal({
      show: false,
    }))

    yield put(connectExistingClientInChatSuccess())

  } catch (error: any) {    
    toast.info(error?.message);
    yield put(connectExistingClientInChatChatFailure())
  }
}

function* watchFetchRequests() {
  yield debounce(200, getChats, handleGetChats);
  yield takeEvery(loadMoreChats, handleLoadMoreChats);

  yield takeEvery(createChat, handleCreateChat);

  yield takeEvery(getChat, handleGetChat);
  yield takeEvery(getMessages, handleGetMessages);
  yield takeEvery(loadMoreMessages, handleLoadMoreMessages);
  yield takeEvery(deleteChat, handleDeleteChat);

  yield takeEvery(createMessage, handleCreateMessage);
  yield takeEvery(readMessage, handleReadMessage);
  yield takeEvery(deleteMessage, handleDeleteMessage);

  yield takeEvery(getUnreadChatsDetails, handleGetUnreadChatsDetails);
  yield takeEvery(confirmRequestNewClientInChat, confirmRequestNewClient);
  yield takeEvery(connectExistingClientInChat, handleConnectExistingClientInChat);
}

export function* chatsSaga() {
  yield all([fork(watchFetchRequests)]);
}
