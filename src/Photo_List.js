import React, {useCallback, useRef, useMemo, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  Dimensions,
  Image,
} from 'react-native';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetModal,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import CameraRoll from '@react-native-community/cameraroll';
import R from 'ramda';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import ModalDropdown from 'react-native-modal-dropdown';
import AutoHeightImage from 'react-native-auto-height-image';
import Loading from './Loading';
const Photo_List = () => {
  const [image, setImage] = useState([]);
  const [group_name, setGroup_name] = useState(['전체']);
  const [pick_group, setPick_group] = useState('');
  const [choise_imasge, setChoise_imasge] = useState([]);
  const [final_image, setFinal_image] = useState([]);
  const [loading, setLoading] = useState(false);
  const hasAndroidPermission = async () => {
    try {
      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

      const hasPermission = await PermissionsAndroid.check(permission);
      if (hasPermission) {
        return true;
      }

      const status = await PermissionsAndroid.request(permission);
      return status === 'granted';
    } catch (error) {
      console.log(error);
    }
  };
  async function _handleButtonPress() {
    if (Platform.OS === 'android') {
      hasAndroidPermission().then(res => {
        if (res === true) {
          CameraRoll.getPhotos({
            first: 99999999999999,
            assetType: 'Photos',
            groupTypes: 'All',
            groupName: pick_group === '전체' ? '' : pick_group,
          })
            .then(r => {
              const groupNamesAr = R.map(item => {
                return item.node.group_name;
              })(r.edges);
              groupNames = R.countBy(i => i)(groupNamesAr);
              setGroup_name(data => [...data, ...Object.keys(groupNames)]);
              setImage(r.edges);
              setPick_group('전체');
            })
            .catch(err => {
              //Error Loading Images
            });
        }
      });
    } else {
      CameraRoll.getPhotos({
        first: 99999999999999,
        assetType: 'Photos',
        groupTypes: 'All',
        groupName: 'Camera Roll',
      })
        .then(r => {
          const groupNamesAr = R.map(item => {
            return item.node.group_name;
          })(r?.edges ?? []);
          groupNames = R.countBy(i => i)(groupNamesAr);
          setGroup_name(data => [...Object.keys(groupNames)]);
          setPick_group(Object.keys(groupNames)[0]);
          setImage(r.edges);
        })
        .catch(err => {
          //Error Loading Images
        });
    }
  }
  async function _handleChage_group() {
    setLoading(true);
    CameraRoll.getPhotos({
      first: 99999999999999,
      assetType: 'Photos',
      groupTypes: 'All',
      groupName: pick_group === '전체' ? '' : pick_group,
    })
      .then(r => {
        setLoading(false);
        setImage(r.edges);
      })
      .catch(err => {
        setLoading(false);

        //Error Loading Images
      });
  }
  useEffect(() => {
    _handleButtonPress();
  }, []);

  //바꼈을때
  useEffect(() => {
    _handleChage_group();
  }, [pick_group]);

  // hooks
  const sheetRef = useRef(null);

  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    sheetRef.current?.present();
  }, []);

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
    <SafeAreaView style={{flex: 1, backgroundColor: '#b2b2b2'}}>
      <View style={styles.container}>
        <View>
          <Text>사진 랜더링후 불러오기 삽질중 하하</Text>
        </View>
        <TouchableOpacity onPress={handlePresentModalPress}>
          <Text>오픈</Text>
        </TouchableOpacity>
        <View>
          <Text>이미지 나열 하하하하 </Text>
        </View>
        <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap'}}>
          {final_image.map((item, index) => {
            return (
              <View
                key={index}
                onPress={() => console.log(item)}
                style={{
                  width: Dimensions.get('window').width * 0.32,
                  height: 120,
                  marginTop: 10,
                  marginLeft: Dimensions.get('window').width * 0.01,
                }}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                  }}
                  source={{uri: item.uri}}
                />
              </View>
            );
          })}
        </View>
        <BottomSheetModal
          enableOverDrag={true}
          ref={sheetRef}
          snapPoints={snapPoints}
          // onChange={handleSheetChanges}
        >
          <View style={{flex: 1}}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                paddingHorizontal: 5,
                paddingVertical: 5,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  sheetRef.current?.forceClose();
                  setPick_group(group_name[0]);
                  setChoise_imasge([]);
                }}>
                <Text>닫기</Text>
              </TouchableOpacity>
              <ModalDropdown
                style={{
                  alignSelf: 'flex-end',
                  width: Dimensions.get('window').width * 0.41,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#0000001A',
                }}
                dropdownStyle={{
                  width: Dimensions.get('window').width * 0.41,
                  borderColor: '#0000001A',
                  borderWidth: 2,
                  borderRadius: 10,
                  paddingTop: 5,
                  paddingBottom: 5,
                }}
                dropdownTextStyle={[
                  {
                    color: '#111',
                  },
                ]}
                options={group_name}
                renderButtonText={rowData => {
                  setPick_group(rowData);
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: 40,
                    alignItems: 'center',
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}>
                  <View style={{flex: 1}}>
                    <Text
                      style={[
                        {
                          color: '#333',
                          textAlign: 'center',
                        },
                      ]}>
                      {pick_group.length === 0 ? '전체' : pick_group}
                    </Text>
                  </View>
                  <View>
                    <AutoHeightImage
                      width={15}
                      source={require('./assets/images/drop_down.png')}
                    />
                  </View>
                </View>
              </ModalDropdown>
              <View style={{alignItems: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => {
                    setFinal_image(choise_imasge);
                    setPick_group(group_name[0]);
                    sheetRef.current?.forceClose();
                  }}>
                  <Text>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
            <BottomSheetFlatList
              scrollEnabled={!loading}
              numColumns={3}
              data={image}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => console.log(item)}
                  style={{
                    width: Dimensions.get('window').width * 0.32,
                    height: 120,
                    marginTop: 10,
                    marginLeft: Dimensions.get('window').width * 0.01,
                  }}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 10,
                    }}
                    source={{uri: item.node.image.uri}}
                  />
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      position: 'absolute',
                      right: 0,
                      borderTopRightRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 200,
                      backgroundColor: '#fff',
                    }}>
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
                      <AutoHeightImage
                        width={20}
                        style={{borderTopRightRadius: 5}}
                        source={
                          someArray(item.node.image.uri) === true
                            ? require('./assets/images/chack_on.png')
                            : require('./assets/images/chack_off.png')
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.contentContainer}
            />
            {loading && <Loading transparent />}
          </View>
        </BottomSheetModal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: 'white',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
});

export default Photo_List;
