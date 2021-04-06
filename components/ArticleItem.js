import React from "react";
import { Image } from 'react-native';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right,Left,Body } from 'native-base';
import ta from 'time-ago'
export default function ArticleItem({article,customFunc}) {
    return (
      <Card >
         <CardItem header bordered button onPress={() => customFunc(article.slug)}>
              <Text style={styles.title}>{article.title}</Text>
            </CardItem>

        <CardItem >
              <Image source={{uri: article.photo}} style={{height: 200, width: null, flex: 1}}/>

            </CardItem>
            
            <CardItem footer>
              <Left>

              <Text>by: {article.author ? article.author.username: "Unknown User"}</Text>
              </Left>
              <Right>

              <Text> {ta.ago(article.createdAt)}</Text>
              </Right>
            </CardItem>
      </Card>
    )
}
const styles = StyleSheet.create({
    title: {
      fontSize: 20,
    },
  });
