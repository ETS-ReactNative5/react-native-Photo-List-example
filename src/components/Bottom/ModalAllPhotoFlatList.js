import React, {useMemo, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import Loading from '../Loading';
import BottomPhotoFlatListHeader from './BottomPhotoFlatListHeader';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const ModalAllPhotoFlatList = props => {
  //ref변수
  const {sheetRef = null} = props;

  //필요 변수 정의
  const {
    choise_imasge = [], //선택한 이미지 파일
    group_name = [], //그룹 파일 네임 배열
    pick_group = '전체', //선택된 그룹 명
    final_image = [], //선택된 이미지
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

  const {
    FlatList_Height = 100, //선택후 FlatList 크기 지정
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

  //애니메이션
  let image_ref = useSharedValue({height: 0});
  useEffect(() => {
    if (choise_imasge.length === 0) {
      image_ref.value = {height: 0};
    } else {
      image_ref.value = {height: FlatList_Height};
    }
  }, [choise_imasge]);
  const animtionStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(image_ref.value.height, {
        duration: 500,
      }),
    };
  });
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <BottomPhotoFlatListHeader
        {...props}
        sheetRef={sheetRef}
        choise_imasge={choise_imasge}
        group_name={group_name}
        pick_group={pick_group}
        setPick_group={setPick_group}
        setChoise_imasge={setChoise_imasge}
      />
      <Animated.View style={[animtionStyle, {backgroundColor: '#69696990'}]}>
        <FlatList
          scrollEnabled={loading ? !loading : true}
          horizontal
          data={choise_imasge}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.3}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setChoise_imasge(
                    choise_imasge.filter(data => {
                      return data.uri !== item.uri;
                    }),
                  );
                }}
                style={[
                  {
                    width: 80,
                    height: 80,
                    marginTop: 10,
                    marginLeft:
                      index === 0 ? Dimensions.get('window').width * 0.02 : 0,
                    marginRight: Dimensions.get('window').width * 0.02,
                    borderRadius: 10,
                  },
                ]}>
                <Image
                  style={[styles.ImageStyle]}
                  source={{
                    uri: item.uri,
                  }}
                />
                <View
                  style={[
                    {
                      backgroundColor: '#696969',
                      width: 20,
                      height: 20,
                      position: 'absolute',
                      top: -7,
                      right: -7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 200,
                      borderRadius: 100,
                    },
                  ]}>
                  <Image
                    style={{width: 20, height: 20}}
                    source={require('../../assets/images/x_icon_w.png')}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </Animated.View>
      <FlatList
        scrollEnabled={loading ? !loading : true}
        numColumns={numColumns}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.3}
        renderItem={({item, index}) => {
          return CustomRenderItem ? (
            <CustomRenderItem item={item} index={index} />
          ) : (
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
              }}
              style={[
                styles.ImageChoiseView,
                {
                  borderWidth: 2,
                  borderColor: someArray(item.node.image.uri)
                    ? 'skyblue'
                    : '#fff',
                  borderRadius: 10,
                },
              ]}>
              <Image
                style={[styles.ImageStyle]}
                source={{
                  uri: item.node.image.uri,
                }}
              />
              <View
                style={[
                  styles.ImageChoiseButtonView,
                  someArray(item.node.image.uri) && {
                    backgroundColor: 'skyblue',
                    borderColor: 'skyblue',
                  },
                ]}>
                {choise_imasge?.length !== 0 &&
                  choise_imasge.find(x => x.uri === item.node.image.uri) && (
                    <Text style={[styles.FontChoiseButtonStyle]}>
                      {choise_imasge?.findIndex(
                        obj => obj?.uri == item.node.image.uri,
                      ) + 1 ?? ''}
                    </Text>
                  )}
              </View>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.contentContainer}
      />
      {loading && <Loading transparent />}
    </SafeAreaView>
  );
};

export default ModalAllPhotoFlatList;
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
    borderRadius: 8,
  },
  ImageChoiseButtonView: {
    width: 25,
    height: 25,
    position: 'absolute',
    top: 2,
    right: 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
    borderColor: '#fff',
    borderRadius: 100,
    borderWidth: 2,
  },
  FontChoiseButtonStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
});
