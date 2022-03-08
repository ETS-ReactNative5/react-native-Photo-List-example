import React from 'react';
import {View, ActivityIndicator, Modal} from 'react-native';

export default function Loading({transparent = false}) {
  return (
    <Modal
      visible={true}
      transparent={true}
      animationType={'fade'}
      statusBarTranslucent //6.22버전에 추가됨
    >
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: transparent ? '#0002' : '#fff',
          zIndex: 1,
          flex: 1,
        }}>
        <ActivityIndicator color={'#6244ff'} size={'large'} />
      </View>
    </Modal>
  );
}
