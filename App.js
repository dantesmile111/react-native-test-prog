import React, { Component } from 'react'
import CreateCard from '../AwesomeProject/src/CreateCard'
import Icon from '@expo/vector-icons/Ionicons'
import { Text, View, StyleSheet, Button, ScrollView, SafeAreaView } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack';
import { ImageCard } from './src/ImageCard';
import { TextInput } from 'react-native-gesture-handler';
import {apiEdpoint} from './src/envconfig';





class App extends Component {
  render () {
    return <AppContainer/>
  }
}

export default App




class WelcomeScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {
        login: 'hello'
    }
}
  render() {
    return (
      <View style={ style.container }>
        <Button 
          title='Login' 
          onPress={() => this.props.navigation.navigate('Dashboard')} 
        />
        <TextInput 
        style={{borderWidth:1, borderColor: 'black', marginBottom: 15, height: 50, width: 200}}
        placeholder='login'
        onChangeText={(loginName) => this.setState({login: loginName})} />
        <Button 
          title='alertLogin' 
          onPress={() => alert(this.state.login)} 
        />
      </View>
    )
  }
}

class Feed extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        json: []
    }
}


componentDidMount = async () => { 
  const url = (apiEdpoint + 'quiz.json')
    fetch(url, { 
        method: 'GET', 
        observe: 'body' 
    })
    .then(res => res.json())
    .then(json => Object.values(json))
    .then(json => this.setState({json})
)
}
  
  render() {
    return (    
        <View style={ style.card }>
          <ScrollView >
            <View style={{marginTop: 30, flexDirection: 'row', flexWrap: 'wrap'}}>
            {
              this.state.json.map((item, id) => 
                <ImageCard data={item} key={id}/>  
              )
            }
            </View>
          </ScrollView>
        </View>
    )
  }
}

class Settings extends Component {
  render() {
    return (
      <View style={ style.container }>
        <CreateCard/>
      </View>
    )
  }
}

class Profile extends Component {
  render() {
    return (
      <View style={ style.container }>
        <Text>hi</Text>
      </View>
    )
  }
}

const Detail = props => (
  <View>
    <Text>Detail</Text>
  </View>
)

const FeedStack = createStackNavigator({
  Feed:{
    screen: Feed,
    navigationOptions:({ navigation }) => {
      return{
        headerTitle: 'Feed',
        headerLeft:(
          <Icon 
            onPress={() => navigation.openDrawer()}
            style={{paddingLeft: 10}} 
            name="md-menu" size={30} 
          />
        )
      }
    }
  },
  Detail:{
    screen: Detail
  }
},{
  defaultNavigationOptions: {
    gesturesEnabled: false
  }
})

const ProfileStack = createStackNavigator({
  Profile:{
    screen: Profile,
    navigationOptions:({ navigation }) => {
      return{
        headerTitle: 'Profile',
        headerLeft:(
          <Icon 
            onPress={() => navigation.openDrawer()}
            style={{paddingLeft: 10}} 
            name="md-menu" size={30} 
          />
        )
      }
    }
  },
})

const SettingsStack = createStackNavigator({
  Settings:{
    screen: Settings,
    navigationOptions:({ navigation }) => {
      return{
        headerTitle: 'Settings',
        headerLeft:(
          <Icon 
            onPress={() => navigation.openDrawer()}
            style={{paddingLeft: 10}} 
            name="md-menu" size={30} 
          />
        )
      }
    }
  }
})

const DashboardTabNavigator = createBottomTabNavigator({
  FeedStack,
  ProfileStack,
  SettingsStack
},
{
  navigationOptions:({ navigation }) => {
    const {routeName} = navigation.state.routes
    [navigation.state.index];
      return{
        header: null,
        headerTitle:routeName
      }
    } 
  }
)

const DashboardStackNavigator = createStackNavigator({
  DashboardTabNavigator: DashboardTabNavigator
},{
  defaultNavigationOptions:({navigation}) => {
    return{
      headerLeft: (
        <Icon 
          onPress={() => navigation.openDrawer()}
          style={{paddingLeft: 10}} 
          name="md-menu" size={30} 
        />
      )
    }
  }
})

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard:{screen: DashboardStackNavigator},
  WelcomeScreen
  
})

const AppSwitchNavigator = createSwitchNavigator({
  Welcome:{screen: WelcomeScreen},
  Dashboard:{screen: AppDrawerNavigator}
})

const AppContainer = createAppContainer(AppSwitchNavigator)

const style = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 2,
  }
})