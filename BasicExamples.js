import React, {useCallback, memo, useRef, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import BottomSheet, {useBottomSheetSpringConfigs} from '@gorhom/bottom-sheet';

const createExampleScreen = ({type, count = 25}) =>
  memo(() => {
    //#region state
    const [enableContentPanningGesture, setEnableContentPanningGesture] =
      useState(true);
    const [enableHandlePanningGesture, setEnableHandlePanningGesture] =
      useState(true);
    //#endregion

    //#region refs
    const bottomSheetRef = useRef(null);
    //#endregion

    //#region variables
    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

    const animationConfigs = useBottomSheetSpringConfigs({
      damping: 80,
      overshootClamping: true,
      restDisplacementThreshold: 0.1,
      restSpeedThreshold: 0.1,
      stiffness: 500,
    });
    //#endregion

    //#region callbacks
    const handleSheetChange = useCallback(index => {
      // eslint-disable-next-line no-console
      console.log('handleSheetChange', index);
    }, []);
    const handleSheetAnimate = useCallback((fromIndex, toIndex) => {
      // eslint-disable-next-line no-console
      console.log('handleSheetAnimate', `from ${fromIndex} to ${toIndex}`);
    }, []);

    //#endregion

    return (
      <View style={styles.container}>
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          animationConfigs={animationConfigs}
          animateOnMount={true}
          enableContentPanningGesture={enableContentPanningGesture}
          enableHandlePanningGesture={enableHandlePanningGesture}
          onChange={handleSheetChange}
          onAnimate={handleSheetAnimate}></BottomSheet>
      </View>
    );
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

export const FlatListExampleScreen = createExampleScreen({
  title: 'FlatList Example',
  type: 'FlatList',
});
