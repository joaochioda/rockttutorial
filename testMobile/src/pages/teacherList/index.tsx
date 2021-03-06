import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native'
import styles from './styles';
import PageHeader from '../../components/pageHeader';
import TeacherItem, { Teacher } from '../../components/teacherItem';
import { ScrollView, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

function TeacherList() {
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject ] = useState('');
    const [week_day, setWeekDay ] = useState('');
    const [time, setTime ] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(resnpose=> {
            if(resnpose) {
                const favoritedTeacher = JSON.parse(resnpose);
                const favoritedTeachersId = favoritedTeacher.map((teacher: Teacher) => teacher.id);
                setFavorites(favoritedTeachersId);
            }
        })
    }

    async function handleFiltersSubmit() {
        loadFavorites();
        const response = await api.get('classes', {
            params: {
              subject,
              week_day,
              time,
            }
          });
          setIsFiltersVisible(false);
          setTeachers(response.data);
    };

    return (
     <View style={styles.container}>
         <PageHeader title="Proffys disponíveis"
            headerRight={(
                <BorderlessButton onPress={() => setIsFiltersVisible(!isFiltersVisible)}>
                    <Feather name="filter" size={20} color="#FFF" />
                </BorderlessButton>
            )}>
             { isFiltersVisible &&  ( <View style={styles.searchForm}>
                <Text style={styles.label}>Matéria</Text>
                <TextInput 
                placeholderTextColor="#c1bccc"
                style={styles.input}
                placeholder="Qual a matéria"
                value={subject}
                onChangeText={text => setSubject(text)} />

            <View style={styles.inputGroup}>
                <View  style={styles.inputBlock}> 
                    <Text style={styles.label}> Dia da semana</Text>
                    <TextInput 
                    placeholderTextColor="#c1bccc"
                    style={styles.input}
                    placeholder="Qual o dia"
                    value={week_day}
                    onChangeText={text => setWeekDay(text)} />
                </View>

                <View  style={styles.inputBlock}> 
                    <Text style={styles.label}>Horário</Text>
                    <TextInput
                    placeholderTextColor="#c1bccc"
                    style={styles.input} 
                    placeholder="Qual o horário"
                    value={time}
                    onChangeText={text => setTime(text)} />
                </View>
            </View>
            <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
            </View> 
             )}
         </PageHeader>
         <ScrollView style={styles.teacherList} contentContainerStyle={{
             paddingHorizontal: 16,
             paddingBottom: 16,
         }}>
            {teachers.map((teacher:Teacher) => ( 
            <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)}/>))}
         </ScrollView>
         
     </View>
    )
}

export default TeacherList;