import React, {useEffect} from 'react';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Photo_List from '../Photo_List';
import {navigationRef, isReadyRef} from './RootNavigation';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const INITIAL_ROUTE_NAME = 'Photo_List';
function Stack_Navigation(props) {
  const forFade = ({current}) => ({
    cardStyle: {opacity: current.progress},
  });
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: false,
      }}
      initialRouteName={INITIAL_ROUTE_NAME}>
      {/* Aush 화면 */}
      <Stack.Screen
        name="Photo_List"
        component={Photo_List}
        headerShown={false}
        options={{
          headerShown: false,
          cardStyleInterpolator: forFade,
          gestureDirection: 'horizontal',
        }}
      />
    </Stack.Navigator>
  );
}
const Router = props => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator
        drawerType="front"
        drawerStyle={{
          width: 0,
          backgroundColor: '#ffffff',
        }}
        // drawerPosition={'right'} //기본값 Left
        // drawerContent={props => <My_Menu {...props} />}
      >
        <Drawer.Screen
          name="Stack_Navigation"
          component={Stack_Navigation}
          options={{drawerLabel: '', swipeEnabled: false, headerShown: false}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Router;
Router.defatulProps = {
  userInfo: null,
};
