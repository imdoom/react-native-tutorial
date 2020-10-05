import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import CourseList from '../components/CourseList';
import UserContext from '../UserContext';
import { firebase } from '../utils/firebase';

const Banner = ({title}) => (
  <Text style={styles.bannerStyle}>{title || '[loading...]'}</Text>
);

const ScheduleScreen = ({navigation}) => {
  const user = useContext(UserContext);
  const [schedule, setSchedule] = useState({ title: '', courses: [] });
  const canEdit = user && user.role === 'admin';

  const view = (course) => {
    navigation.navigate(canEdit ? 'CourseEditScreen' : 'CourseDetailScreen', { course });
  };

  const fixCourses = json => ({
    ...json,
    courses: Object.values(json.courses)
  });
  
  useEffect(() => {
    const db = firebase.database().ref();
    const handleData = snap => {
      if (snap.val()) setSchedule(fixCourses(snap.val()));
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []); 
  return (
    <SafeAreaView  style={styles.container}>
      <Banner title = {schedule.title}/>
      <CourseList courses={schedule.courses} view = {view}/>
    </SafeAreaView >
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerStyle: {
    color: '#888',
    fontSize: 32,
  },
});

export default ScheduleScreen;