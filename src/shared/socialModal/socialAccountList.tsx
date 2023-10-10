import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { BottomSheet } from 'shared/bottomSheet';
import { Icon } from 'shared/icon';


import { styles } from './style';
import { getPageDetails, isModalOpened } from 'store/entities/social';
import { Card, CardBody, CardFooter, CardSubTitle, CardTitle } from 'shared/card';
import { Toggle } from 'shared/toggle';
import COLORS from 'utils/colors';
import { Box } from 'shared/box';
import { Paragraph } from 'shared/paragraph';
import { updateProviderInstagramDetails } from 'store/actions/provider';
import { alert } from 'shared/alert';

type Props = {
  list: Object[] | any | null;
  closeModal: () => void;
  setState: any;
};

const SocialAccountList: React.FC<Props> = ({ list, closeModal, setState }) => {
  console.log("list === >>> ", list);
  
  let accounts: any = list?.data;
  const instaList = accounts?.filter((item: any) => item?.instagram_business_account)
  const dispatch = useDispatch();

  const handleSelectAccount = async (account: any) => {
    console.log("account === >> ", account);
    if(instaList?.length > 0) {
      const igExist = account?.instagram_business_account ? true : false;

      if(!igExist){
        alert.info('This Facebook page does not have any business account connected. Please try with a connected business account.')
        return;
      }

      const pageInfo = await fetch(
        `https://graph.facebook.com/v15.0/${account?.instagram_business_account?.id}?fields=username&access_token=${account?.access_token}`
      ).then((response) => response.json())
      .then((json) => {  
        console.log("json ==== >>>>>>>>>> ", json);
            
          return json;
        })
        .catch((error) => {
          console.log('pagesInfo error++++++', error);
        });

        console.log("pagesInfo basic === >>> ", pageInfo);
        

      let data: any = {
        'instagramBusinessId': account?.instagram_business_account?.id,
        'instagramAccessToken': list?.accessToken,
        'instaLink': `https://www.instagram.com/${pageInfo?.username}/`
      }
  
      dispatch(updateProviderInstagramDetails(data));
    } else {
      dispatch(getPageDetails({
        pageId: account?.id,
        pageAccessToken: account?.access_token
      }))
    }
    setState(null);
  }

  return (
    <BottomSheet size='m'>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {'Account Setup'}
        </Text>
        <TouchableOpacity onPress={closeModal}>
          <Icon src={require('assets/global/close.png')} />
        </TouchableOpacity>
      </View>
      <Paragraph mh={20} mt={20} size='l' type='book' >{'Select a page below that you want to integrate with Alpha Pro.'}</Paragraph>
      <FlatList
        data={accounts}
        keyExtractor={(item: any) => `${item.index}`}
        renderItem={({ item }: any) => {
          const igExist = item?.instagram_business_account ? true : false;
          return (
            <Card onPress={() => handleSelectAccount(item)}>
              <CardBody row jc="space-between" ai="center">
                <Box row ai="center" >
                  <Icon size={30} src={{ uri: item?.picture ? item?.picture?.data?.url : '' }} />
                  <CardTitle ml={10} >{`Page Name: `}<CardSubTitle>{item?.name}</CardSubTitle></CardTitle>
                </Box>
                <Icon src={require('assets/global/arrowRight.png')} />
              </CardBody>
              {instaList?.length > 0 && (
                <CardFooter>
                  <CardTitle ml={10}>{`Instagram Connected: `}<CardSubTitle>{igExist ? 'Yes' : 'No'}</CardSubTitle></CardTitle>
                </CardFooter>
              )}
            </Card>
          )
        }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}
      />
    </BottomSheet>
  );
};

export { SocialAccountList };