# React-Native 내장 갤러리 접근후 파일 선택

## 그냥 만들어보고 싶어서 삽질중

- ~~현재는 테스트 용이여서 뒤죽박죽으로 코딩 되어있습니다. 구동되는거만 확인하였고 모듈화작업은 시간이 날때 틈틈히 해볼 예정입니다.~~
- 컴포넌트 단위로 분리해두었습니다. 모듈화 까지는 많은 시간이 걸릴거 같습니다.
- 참고할 라이브러리나 조언은 언제든지 환영입니다. 감사합니다.
<center>

|                                  `Ios`                                   |                                  `Android`                                   |
| :----------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
| <img src="./src/assets/images/photo_ios.gif"  width="200" height="400"/> | <img src="./src/assets/images/photo_android.gif"  width="200" height="400"/> |

</center>

## 필수적으로 필요한 모듈

- navigation 모듈 정의한후 컨테이너 정의가 꼭 필요합니다.
  - bottom Sheet를 사용하기 위해 해당 부분이 없을경우 스크롤 동작이 일어나지않고 애니메이션 처리가 발생하지 않습니다.

## 현재 까지 진행된 부분

- 모듈화까지는 아니더라도 컴포넌트 분리해두고 사용할 수 있게끔 변경 처리 완료
- 모듈화를하여 땡겨서 사용해볼려고 하였으나 어떤형식으로 교체가 필요한지 감이 안잡혀서 컴포넌트 단위로 분리만 시킴
- 모듈 안에서 이미지를 불로오게 할지 사용하는 컴포넌트 내에서 불러와서 이미지를 전달 시켜줄지는 정하지 못하여 현재는 사용하는 컴포넌트 내에서 불러오게끔 구현

# 권한 관련 필수로 확인하여야합니다.

- ios 같은 경우 info.plist 에

```plist
	<key>NSPhotoLibraryUsageDescription</key>
	<string>사진 권한</string>
```

가 없을 경우 이미지 호출이 안될수 있습니다. 필수로 체크해주셔야됩니다.

- android 같은 경우에는 AndroidManifest.xml에 아래와 같은

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>

```

및

```xml
  <application
      ...
      android:requestLegacyExternalStorage="true" >
```

필수로 적용시켜야지 이상없이 동작합니다.
