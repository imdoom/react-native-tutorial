import React, {useState} from 'react';
import { StyleSheet, View, Text} from 'react-native';
import Course from './Course';
import { hasConflict } from '../Utils/course';

const CourseSelector = ({courses}) => {
    const [selected, setSelected] = useState([]);

    const toggle = course => setSelected(selected => (
        selected.includes(course) ? selected.filter(x => x !== course) : [...selected, course]
      ));

    return (
        <Text style={styles.courseList}>
            { 
                courses.map(course => 
                    (<Course key = {course.id} course={course} 
                        isDisabled = {hasConflict(course, selected)}
                        isSelected = {selected.includes(course)} 
                        select = {toggle}
                        />))
            };
        </Text>
    );
};

const styles = StyleSheet.create({
    courseList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
      }
});

export default CourseSelector;