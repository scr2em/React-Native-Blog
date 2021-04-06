import React, {useEffect,useState }from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from './screens/Feed'
import Profile from './screens/Profile'
import Article from './screens/Article'
import Login from './screens/Login'
import Signup from './screens/Signup'
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Button} from 'native-base';
import { AsyncStorage,  } from 'react-native';
import axios from 'axios'
import jwt_decode from "jwt-decode";

export default function App() {
const [loggedin, setLoggedIn] = useState(false)
  useEffect(async () =>{
      const token = await AsyncStorage.getItem('access_token')
        setLoggedIn(token);
        axios.defaults.headers.common['Authorization'] = token;
        var decoded = jwt_decode(token);
    console.log(decoded)

  },[loggedin])
  let FeedStack = createStackNavigator();
  let Tabs = createBottomTabNavigator();
  return (
    <NavigationContainer>
    <Tabs.Navigator>
      <Tabs.Screen name="Feed" options={{
        tabBarIcon: (titcolor) => <Icon name="home" size={30} /> ,
       
      }}>
        {() => (
          <FeedStack.Navigator initialRouteName="Feed">
            <FeedStack.Screen component={Feed} name="Feed" options={{
               headerRight: () => (
                 
                loggedin ?  <Button onPress={async () => {
                  await AsyncStorage.removeItem('access_token')
                  setLoggedIn(false)
                }}> 
                <Text>Logout</Text>
            </Button>: null
              
              ),
            }} />
            <FeedStack.Screen component={Article} name="Article" />

          </FeedStack.Navigator>
        )}
      </Tabs.Screen>
          {loggedin ?
 <Tabs.Screen name="Profile" options={{
  tabBarIcon: (titcolor) => <Icon android="login" size={30} />
}}>
  {() => (
    <FeedStack.Navigator initialRouteName="Profile">
      <FeedStack.Screen component={Profile} name="Profile" />

    </FeedStack.Navigator>
  )}
</Tabs.Screen>

:

      <Tabs.Screen name="Login" options={{
        tabBarIcon: (titcolor) => <Icon android="login" size={30} />
      }}>
        {() => (
          <FeedStack.Navigator initialRouteName="Login">
            <FeedStack.Screen component={Login} name="Login" />
            <FeedStack.Screen component={Signup} name="Signup" />

          </FeedStack.Navigator>
        )}
      </Tabs.Screen>
      }

    </Tabs.Navigator>
  </NavigationContainer>

  );
}


// export default class App extends React.Component {
//   render() {
//     let FeedStack = createStackNavigator();
//     let MeStack = createStackNavigator();
//     let Tabs = createBottomTabNavigator();
//     return (
//       <NavigationContainer>
//         <Tabs.Navigator>
//           <Tabs.Screen name="Feeds" options={{
//             tabBarIcon: (titcolor) => <Icon name="menu" size={30} />
//           }}
//           >
//             {() => (
//               <FeedStack.Navigator initialRouteName="Feed">
//                 <FeedStack.Screen component={Feed} name="Feed" />
//                 <MeStack.Screen component={UserDetail} name="Details"/>
//               </FeedStack.Navigator>
//             )}
//           </Tabs.Screen>
//           <Tabs.Screen name="Me" options={{
//             tabBarIcon: () => <Icon name="account-circle" size={35} />
//           }}>
//             {() => (
//               <MeStack.Navigator>
//                 <MeStack.Screen component={Me} name="Me" initialParams={{"users":me}}/>
//                 <MeStack.Screen component={Settings} name="Settings"/>
//               </MeStack.Navigator>
//             )}
//           </Tabs.Screen>
//         </Tabs.Navigator>
//       </NavigationContainer>
//     )
//   }
// }
