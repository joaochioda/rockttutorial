import React, {useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LandingImage from '../../assets/images/landing.png';
import StudyIcon from '../../assets/images/icons/study.png'
import GiveClasses from '../../assets/images/icons/give-classes.png'
import HeartIcon from '../../assets/images/icons/heart.png'
import api from '../../services/api';
import { } from 'react-native-gesture-handler'

import styles from './styles';
function Landing() {
    const navigation = useNavigation();
    const [totalConections, setTotalConections] = useState(0);

    useEffect(()=> {
      api.get('connections').then(response => {
        const { total } = response.data;
        setTotalConections(total);
      })
    },[]);

    function handleNavigationToGiveClassesPage() {
        navigation.navigate('GiveClasses');
    }

    function handleNavigationToStudyPage() {
        navigation.navigate('Study');
    }

    return (
        <View style={styles.container}>
            <Image source={LandingImage} style={styles.banner}/>
            <Text style={styles.title}>
                Seja bem vindo, {'\n'}
                <Text style={styles.titleBold}>
                    O que deseja fazer ?
                </Text>
            </Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={handleNavigationToStudyPage}>
                    <Image source={StudyIcon}/>
                    <Text style={styles.buttonText}>Estudar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleNavigationToGiveClassesPage} style={[styles.button, styles.buttonSecondary]}>
                    <Image source={GiveClasses}/>
                    <Text style={styles.buttonText}>Dar aulas</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.totalConnection}>
                Total de {totalConections} conexões já realizadas {' '}
                <Image source={HeartIcon}/>
            </Text>
        </View>
    )
}

export default Landing;