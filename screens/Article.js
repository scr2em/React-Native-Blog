import React,{useEffect,useState} from 'react'
import { Container, Header, Content, Card, CardItem, Text, Icon, Right , H1, H2, H3} from 'native-base';
import { Image,StyleSheet } from 'react-native';
import axios from 'axios'
import {BASE_URL} from '../constants'
export default function Article(props) {
    const [article,setArticle] = useState()
    useEffect(() => {
        axios.get(`${BASE_URL}/article/${props?.route?.params?.slug}`).then(res=>{
                setArticle(res.data.data)
            
        })
        return () => {
            
        }
    }, [])
    return article ?(
        <Container style={styles.body}>
      
        <Image source={{uri: article.photo}} style={{height: 200, width: null}}/>
        <H1>{ article.title }</H1>
        <H3>by: {article.author ? article.author.username: "Unknown User"}</H3>
        <Text>{article.body}</Text>

        </Container>
    ) : (
        <Text>Loading...</Text>
    )
}

const styles = StyleSheet.create({
    body: {
      padding: 5,
    },
  });
