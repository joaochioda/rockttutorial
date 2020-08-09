import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LandingImage from '../../assets/images/landing.png';
import StudyIcon from '../../assets/images/icons/study.png'
import GiveClasses from '../../assets/images/icons/give-classes.png'
import HeartIcon from '../../assets/images/icons/heart.png'
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';
import PageHeader from '../../components/pageHeader';
function TeacherList() {

    return (
     <View style={styles.container}>
         <PageHeader title="Proffys disponíveis"/>
     </View>
    )
}

export default TeacherList;