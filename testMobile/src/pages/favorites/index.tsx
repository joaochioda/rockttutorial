import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import PageHeader from '../../components/pageHeader';
import TeacherItem, { Teacher } from '../../components/teacherItem';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native'
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';

function Favorites() {
    const [favorites, setFavorites] = useState<Teacher[]>([]);
    
    useFocusEffect(() => {
        loadFavorites() 
    });

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(resnpose=> {
            if(resnpose) {
                const favoritedTeacher = JSON.parse(resnpose);
                setFavorites(favoritedTeacher);
            }
        })
    }
    
    return (
        <View style={styles.container}>
        <PageHeader title="Meus proffys favoritos"/>
        <ScrollView style={styles.teacherList} contentContainerStyle={{
             paddingHorizontal: 16,
             paddingBottom: 16,
         }}>
           {favorites.map((teacher: Teacher)=> {
               return (
                   <TeacherItem key={teacher.id} teacher={teacher} favorited/>
               )
           })}
         </ScrollView>
    </View>
       )
}

export default Favorites;