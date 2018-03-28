import React, { Component } from "react";
import { Alert, View, StatusBar, TextInput } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  ListItem,
  Text,
  Badge,
  Left,
  Right,
  Body,
  Switch,
  Radio,
  Picker,
  Separator,
  Form,
  Label,
  Input,
  Toast
} from "native-base";
import firebase from 'react-native-firebase';
import moment from 'moment'

import styles from "./styles";

const Item = Picker.Item;

class ApplyLoanSuccess extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: undefined,
      term: "1",
      text: "",
      results: {
        items: []
      },
      amount: '',
      age: '',
      bankAccount: '',
      bankName: '',
    };
  }

  onValueChange(value: string) {
    this.setState({
      term: value
    });
  }

  validateData() {
    if (this.state.amount) {
      let termLabel = "Months"
      if (this.state.term == 1) {
        termLabel = "Weekly"
      }
      Alert.alert(
        'Summary your information',
        'Amount: ' + this.state.amount + '\n' +
        'Age: ' + this.state.age + '\n' +
        'Bank Account: ' + this.state.bankAccount + '\n' +
        'Bank Name: ' + this.state.bankName + '\n' +
        'Term: ' + this.state.term + " " + termLabel,
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'Apply Loan', onPress: () => this.applyLoan() },
        ],
        { cancelable: false }
      )
    } else {
      Toast.show({
        text: "Please enter amount",
        style: {
          backgroundColor: "red"
        }
      })
    }
  }

  applyLoan() {
    let now = moment();
    let created = updated = now.format("D-M-Y hh:mm:ss");
    let term = this.state.term > 1 ? this.state.term * 4 : 1;
    // Create loan
    // Loan
    firebase.database().ref('/loans').push(
      {
        userId: 1,
        created: created,
        amount: this.state.amount,
        status: 'applying',
        term: term,
        profile: {
          bankName: this.state.bankName,
          bankAccount: this.state.bankAccount,
          age: this.state.age
        }
      }
    )
    // Generate schedule
  }

  formatAmount() {
    return Number(this.state.amount).toLocaleString()
  }

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content"/>
        <Header
          style={{ backgroundColor: "#4ef442" }}
          androidStatusBarColor="#4ef442"
          iosBarStyle="light-content"
        >
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("Home")}>
              <Icon name="home" style={{ color: "#FFF" }}/>
            </Button>
          </Left>
          <Body>
          <Title style={{ color: "#FFF" }}>Success!</Title>
          </Body>
          <Right/>
        </Header>

        <View style={styles.formContainer}>
          <Text>We are checking your request, you will received notification when we done.</Text>
        </View>

        <Button
          style={[styles.actionButton, { width: 300, backgroundColor: '#4fdda5', marginTop: 10 }]}
          onPress={() => this.props.navigation.navigate("LoanStatus")}
        >
          <Text style={styles.actionText}>Click here to check your loan status</Text>
        </Button>


      </Container>
    );
  }
}

export default ApplyLoanSuccess;
