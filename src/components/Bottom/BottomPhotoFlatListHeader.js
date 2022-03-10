import React from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
const BottomPhotoFlatListHeader = props => {
  //스타일 정의
  const {
    HeaderConteiner = null, //전체 헤더 컴포넌트
    dropdownStyle = null, //커스텀 드롭 다운
    dropdowndropStyle = null, //드롭 당룬 스타일
    dropdowndropTextStyle = null, //드롭 다운 들보 텍스트 스타일
    dropDwonViewTextStyle = null, //드롭 다운 뷰 테스트 스타일
    dropDownViewImageStyle = null, //드롭 다운 뷰 이미지 스타일
    leftViewStyle = null, //왼쪽 텍스트 뷰 스타일
    rightViewStyle = null, //오른쪽 텍스트 뷰 스타일
  } = props;

  //imageUri
  const {
    image = null, //이미지 uri require('../image/text.png') or {uri: https://uri.png}
  } = props;

  //ref변수

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
    setPick_count = () => {}, //선택한 파일 수량 호출 변경
    setChoise_imasge = () => {}, //선택한 아이템 전달 함수
    setFinal_image = () => {}, //선택후 완료
    close = () => {}, // 모달 닫기
  } = props;
  return (
    <View style={[styles.HeaderConteiner, HeaderConteiner]}>
      <TouchableOpacity
        style={[
          {
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          },
          leftViewStyle,
        ]}
        onPress={async () => {
          close(false);
          await setPick_count(group_name[0].count);
          await setTimeout(() => {
            setPick_group(group_name[0].title);
          }, 500);
          setChoise_imasge(final_image);
        }}>
        <Image
          style={{width: 20, height: 20}}
          source={require('../../assets/images/close_icon.png')}
        />
      </TouchableOpacity>
      <ModalDropdown
        style={[styles.ModalDropDownContainer, dropdownStyle]}
        dropdownStyle={[styles.ModalDropdownDropStyle, dropdowndropStyle]}
        dropdownTextStyle={[
          styles.ModalDropDownTextStyle,
          dropdowndropTextStyle,
        ]}
        renderRowComponent={TouchableOpacity}
        renderRow={(option, index, isSelected) => {
          return (
            <View style={(styles.ModalDropdownDropStyle, dropdowndropStyle)}>
              <View
                style={{flex: 1, paddingVertical: 5, paddingHorizontal: 10}}>
                <Text
                  style={[
                    styles.ModalDropDownTextStyle,
                    dropdowndropTextStyle,
                  ]}>
                  {option?.title}
                </Text>
              </View>
            </View>
          );
        }}
        options={group_name}
        renderButtonText={async rowData => {
          await setPick_count(rowData.count);
          await setTimeout(() => {
            setPick_group(rowData.title);
          }, 500);
        }}>
        <View style={styles.ModalDropDwonViewTextContainer}>
          <View style={{flex: 1}}>
            <Text
              style={[
                styles.ModalDropDwonViewTextStyle,
                dropDwonViewTextStyle,
              ]}>
              {pick_group.length === 0 ? '전체' : pick_group}
            </Text>
          </View>
          <View>
            <Image
              style={[styles.ModalDropViewImageStyle, dropDownViewImageStyle]}
              source={
                image ? image : require('../../assets/images/drop_down.png')
              }
            />
          </View>
        </View>
      </ModalDropdown>
      <View style={{alignItems: 'flex-end'}}>
        <View
          style={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {choise_imasge.length !== 0 && (
            <TouchableOpacity
              style={[
                {
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                rightViewStyle,
              ]}
              onPress={async () => {
                setFinal_image(choise_imasge);
                await setPick_count(group_name[0].count);
                await setTimeout(() => {
                  setPick_group(group_name[0].title);
                }, 500);
                close(false);
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/images/send_icon.png')}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default BottomPhotoFlatListHeader;

const styles = StyleSheet.create({
  //전체 정의
  HeaderConteiner: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  //모달 부분 정의
  ModalDropDownContainer: {
    width: Dimensions.get('window').width * 0.41,
    borderRadius: 10,
    borderColor: '#0000001A',
  },
  ModalDropdownDropStyle: {
    width: Dimensions.get('window').width * 0.41,
    borderRadius: 10,
    borderColor: '#0000001A',
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  ModalDropDownTextStyle: {
    color: '#111',
    fontSize: 12,
  },
  ModalDropDwonViewTextContainer: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  ModalDropDwonViewTextStyle: {
    color: '#333',
    textAlign: 'center',
  },
  ModalDropViewImageStyle: {width: 15, height: 15},
});
