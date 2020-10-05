import React, { useState} from 'react';
import { firebase } from '../utils/firebase';
import * as Yup from 'Yup';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Form from '../components/Form'

const SignInScreen = ({ navigation }) => {
    const [signInError, setSignInError] = useState('');
    const validationSchema = Yup.object().shape({
        email: Yup.string()
          .required('Please enter a valid email')
          .email()
          .label('Email'),
        password: Yup.string()
          .required()
          .min(6, 'Password must have at least 6 characters')
          .label('Password'),
        confirm: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Confirmation password must match password'),
    });
    async function handleOnSubmit(values) {
        const { email, password, confirm } = values;
        confirm ? 
                firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => setSignInError(error.message))
                :
                firebase.auth().signInWithEmailAndPassword(email, password).catch(error => setSignInError(error.message));
    }
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Form
            initialValues={{
              email: '',
              password: '',
              confirm: '',
            }}
            validationSchema={validationSchema}
            onSubmit={values => handleOnSubmit(values)}
          >
            <Form.Field
              name="email"
              leftIcon="email"
              placeholder="Enter email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            <Form.Field
              name="password"
              leftIcon="lock"
              placeholder="Enter password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              textContentType="password"
            />
            <Form.Field
              name="confirmPassword"
              leftIcon="lock"
              placeholder="Confirm password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              textContentType="password"
            />
            <Form.Button title={values => values.confirm ? 'Sign up' : 'Log in'} />
            {<Form.ErrorMessage error={signInError} visible={true} />}
          </Form>
        </ScrollView>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ccccb3'
    }
  });

export default SignInScreen;