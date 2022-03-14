import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  Modal,
} from 'react-native';
import ModalAllPhotoFlatList from './ModalAllPhotoFlatList';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const BottomPhotoFlatList = props => {
  const [isModal, setIsModal] = useState(false);

  //on off state
  const {open = true} = props;

  //필요 변수 정의
  const {
    choise_imasge = [], //선택한 이미지 파일
    group_name = [], //그룹 파일 네임 배열
    final_image = [], //선택된 이미지
  } = props;

  //실행 함수 정의
  const {
    setPick_group = () => {}, //선택한 파일 네임 변경 함수
    setPick_count = () => {}, //선택한 파일 수량 호출 변경
    setChoise_imasge = () => {}, //선택한 아이템 전달 함수
    setFinal_image = () => {}, //선택후 완료
    setOpen = () => {}, //열고 닫기
  } = props;

  //FlatList 추가 적인 기능 정의
  const {
    CustomRenderItem = null, //랜더 컴포넌트 정의
    loading = null, //로딩 유무
  } = props;
  //FlatList 필요 변수 정의
  const {
    data = [], // FlatList 초기값
  } = props;

  //커스텀 아이콘
  const {
    left_icon = null, //커스텀 왼쪽 아이콘 이미지
    left_icon_size = 20, // 커스텀 왼쪽 아이콘 사이즈
    right_icon = null, //커스텀 오른쪽 아이콘 이미지
    right_icon_size = 20, //커스텀 오른쪽 아이콘 사이즈
    bottom_icon = null, //하단 아이콘 이미지
    bottom_icon_size = 20, //하단 아이콘 사이즈
    bottom_Text = '전체', //하든 글씨
  } = props;

  //커스텀 아이콘 스타일
  const {
    LeftIconViewStyle = null, //왼쪽아이콘 컨테이너 스타일
    RightIconViewStyle = null, //오른쪽 아이콘 컨테이너 스타일
    BottomViewStyle = null, //바텀뷰 스타일
    BottomViewTextStyle = null, //바텀 텍스트 스타일
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
  let image_ref = useSharedValue({height: 0});

  useEffect(() => {
    if (!open) {
      image_ref.value = {height: 0};
    } else {
      image_ref.value = {height: 320};
    }
  }, [open]);
  const animtionStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(image_ref.value.height, {
        duration: 500,
      }),
    };
  });
  return (
    <>
      <Animated.View
        style={[animtionStyle, {height: 'auto', backgroundColor: '#fff'}]}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            height: left_icon_size * 2,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={async () => {
              await setPick_count(group_name[0].count);
              await setTimeout(() => {
                setPick_group(group_name[0].title);
              }, 500);
              setChoise_imasge(final_image);
              setOpen(false);
            }}
            style={[
              styles.IconViewStyle,
              {
                width: left_icon_size * 2,
                height: left_icon_size * 2,
              },
              LeftIconViewStyle,
            ]}>
            {left_icon ? (
              <Image
                style={{width: left_icon_size, height: left_icon_size}}
                source={left_icon}
              />
            ) : (
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/images/close_icon.png')}
              />
            )}
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            {choise_imasge.length !== 0 && (
              <TouchableOpacity
                onPress={async () => {
                  setFinal_image(choise_imasge);
                  await setPick_count(group_name[0].count);
                  await setTimeout(() => {
                    setPick_group(group_name[0].title);
                  }, 500);
                  setOpen(false);
                }}
                style={[
                  styles.IconViewStyle,
                  {
                    width: right_icon_size * 2,
                    height: right_icon_size * 2,
                    backgroundColor: 'skyblue',
                  },
                  RightIconViewStyle,
                ]}>
                {right_icon ? (
                  <Image
                    style={{width: right_icon_size, height: right_icon_size}}
                    source={right_icon}
                  />
                ) : (
                  <Image
                    style={{width: 20, height: 20}}
                    source={require('../../assets/images/send_icon.png')}
                  />
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
        <FlatList
          scrollEnabled={loading ? !loading : true}
          horizontal
          data={data}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.3}
          showsHorizontalScrollIndicator={false}
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
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}>
          <TouchableOpacity
            onPress={() => {
              setOpen(false);
              setIsModal(true);
            }}
            style={[
              styles.BottomViewStyle,
              {
                height: bottom_icon_size,
              },
              BottomViewStyle,
            ]}>
            {bottom_icon ? (
              <Image
                style={{width: bottom_icon_size, height: bottom_icon_size}}
                source={bottom_icon}
              />
            ) : (
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/images/all_icon.png')}
              />
            )}
            <Text style={[styles.BottomViewTextStyle, BottomViewTextStyle]}>
              {bottom_Text}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Modal
        visible={isModal}
        transparent
        animationType="fade"
        // statusBarTranslucent //6.22버전에 추가됨
        onRequestClose={() => setIsModal(false)}>
        <ModalAllPhotoFlatList
          {...props}
          close={setIsModal}
          isModal={isModal}
        />
      </Modal>
    </>
  );
};

export default BottomPhotoFlatList;
const styles = StyleSheet.create({
  //FlatList정의
  contentContainer: {
    backgroundColor: 'white',
    paddingTop: -10,
  },
  ImageChoiseView: {
    width: Dimensions.get('window').width * 0.46,
    height: 250,
    marginRight: Dimensions.get('window').width * 0.01,
  },
  ImageStyle: {
    width: '100%',
    height: '100%',
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
    borderWidth: 1,
  },
  FontChoiseButtonStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  //아이콘 스타일 정의
  IconViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  //바텀 컨테이너
  BottomViewStyle: {
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BottomViewTextStyle: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 5,
  },
});
