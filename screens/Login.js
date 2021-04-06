import React,{useState} from 'react'
import { Container, Header, Content, Card, CardItem, Text, Icon, Right,Form, Item,Input,Button} from 'native-base';
import {BASE_URL} from '../constants'
import axios from 'axios';
import { AsyncStorage } from 'react-native';

export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');

    var handleSubmit = ()=>{
        axios.post(`${BASE_URL}/login`, {email,password}).then(async res =>  {
         await AsyncStorage.setItem(
                'access_token',
                res.data.data.access_token);
                setError('')
            navigation.navigate('Feed');
            

          }).catch(err=>{
                    setError(err.response.data.message)
          });
    }
    return (
        <Container>
        <Content>
            <Text>{error}</Text>
          <Form>
              
            <Item>
              <Input placeholder="Email" value={email}onChangeText={(e)=>setEmail(e)}/>
            </Item>
            <Item last>
              <Input placeholder="Password" value={password}onChangeText={(e)=>setPassword(e)} />
            </Item>
            <Item>
            <Button onPress={handleSubmit}>
                <Text>Login</Text>
            </Button>
            </Item>
          </Form>
        </Content>
      </Container>
    )
}
