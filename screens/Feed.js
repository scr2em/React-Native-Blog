import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Left
} from 'native-base';
import axios from 'axios';
import ArticleItem from '../components/ArticleItem';
import {BASE_URL} from '../constants';

export default function Feed({navigation}) {
  const [refreshing, setRefreshing] = useState(false);

  const [articles, setArticles] = useState([]);
  useEffect(() => {
    axios.get(`${BASE_URL}/article`).then(res => {
      let {data} = res.data;
      setArticles(data);
    });
  }, []);

  const onRefresh = React.useCallback(() => {
    axios
      .get(`${BASE_URL}/article`)
      .then(res => {
        let {data} = res.data;
        setArticles(data);
        setRefreshing(false);
      })
      .catch(err => {
        setRefreshing(false);
      });
  }, []);


  const handleClick =(slug)=>{
    navigation.navigate('Article', {slug});

  }
  return articles.length == 0 ? (
    <Text>Loading...</Text>
  ) : (
    <SafeAreaView
    // style={styles.container}
    >
      <ScrollView
        // contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {articles.map(article => {
          return (
        
                <ArticleItem article={article} customFunc={handleClick}/>
            
        
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
