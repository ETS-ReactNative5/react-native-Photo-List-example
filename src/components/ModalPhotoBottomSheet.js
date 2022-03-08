import React, {useMemo} from 'react';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetModal,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import ModalPhotoHeader from './ModalPhotoHeader';
import Loading from './Loading';
import FastImage from 'react-native-fast-image';

const ModalPhotoBottomSheet = props => {
  //ref변수
  const {sheetRef = null} = props;

  //필요 변수 정의
  const {
    choise_imasge = [], //선택한 이미지 파일
    group_name = [], //그룹 파일 네임 배열
    pick_group = '전체', //선택된 그룹 명
  } = props;

  //실행 함수 정의
  const {
    setPick_group = () => {}, //선택한 파일 네임 변경 함수
    setChoise_imasge = () => {}, //선택한 아이템 전달 함수
  } = props;

  //FlatList 추가 적인 기능 정의
  const {
    CustomRenderItem = null, //랜더 컴포넌트 정의
    loading = null, //로딩 유무
  } = props;
  //FlatList 필요 변수 정의
  const {
    data = [], // FlatList 초기값
    snapPoints = useMemo(() => ['25%', '50%', '90%'], []), // SnapPoint스냅 포인트 정의
    numColumns = 3, //컬럼 숫자
  } = props;

  //비교 함수
  const someArray = item => {
    return choise_imasge.some(data => {
      if (data.uri == item) {
        return true;
      } else {
        return false;
      }
    });
  };

  return (
    <BottomSheetModal
      enableOverDrag={true}
      ref={sheetRef}
      snapPoints={snapPoints}>
      <View style={{flex: 1}}>
        <ModalPhotoHeader
          {...props}
          sheetRef={sheetRef}
          choise_imasge={choise_imasge}
          group_name={group_name}
          pick_group={pick_group}
          setPick_group={setPick_group}
          setChoise_imasge={setChoise_imasge}
        />
        <BottomSheetFlatList
          scrollEnabled={loading ? !loading : true}
          numColumns={numColumns}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.3}
          renderItem={({item, index}) => {
            return CustomRenderItem ? (
              <CustomRenderItem item={item} index={index} />
            ) : (
              <View style={[styles.ImageChoiseView]}>
                <Image
                  style={[styles.ImageStyle]}
                  source={{
                    uri: item.node.image.uri,
                  }}
                />
                <View style={[styles.ImageChoiseButtonView]}>
                  <TouchableOpacity
                    onPress={() => {
                      if (someArray(item.node.image.uri) === true) {
                        setChoise_imasge(
                          choise_imasge.filter(data => {
                            return data.uri !== item.node.image.uri;
                          }),
                        );
                      } else {
                        setChoise_imasge(data => {
                          return [
                            ...data,
                            {
                              uri: item.node.image.uri,
                              type: 'image',
                              name: item.node.image.filename,
                            },
                          ];
                        });
                      }
                    }}>
                    <Image
                      style={[styles.ImageChoiseButtonStyle]}
                      source={
                        someArray(item.node.image.uri) === true
                          ? require('../assets/images/chack_on.png')
                          : require('../assets/images/chack_off.png')
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          contentContainerStyle={styles.contentContainer}
        />
        {loading && <Loading transparent />}
      </View>
    </BottomSheetModal>
  );
};

export default ModalPhotoBottomSheet;
const styles = StyleSheet.create({
  //FlatList정의
  contentContainer: {
    backgroundColor: 'white',
  },
  ImageChoiseView: {
    width: Dimensions.get('window').width * 0.32,
    height: 120,
    marginTop: 10,
    marginLeft: Dimensions.get('window').width * 0.01,
  },
  ImageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  ImageChoiseButtonView: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 0,
    borderTopRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
    backgroundColor: '#fff',
  },
  ImageChoiseButtonStyle: {
    width: 20,
    height: 20,
    borderTopRightRadius: 5,
  },
});
