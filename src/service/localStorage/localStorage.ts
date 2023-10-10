import AsyncStorage from '@react-native-async-storage/async-storage';

export const get = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error(e);
  }
};

export const save = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error('error saving in storage: ', e);
  }
};

export const deleteItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('error removing in storage: ', e);
  }
};

export const clear = async (key: string, value: any) => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error('error clearing in storage: ', e);
  }
};

export const Storage = {
  get,
  save,
  deleteItem,
  clear
};