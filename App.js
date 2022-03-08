import React from 'react';
import Router from './src/route/Router';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler'; //-->add

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <Router />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
