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

class ApplyLoan extends Component {
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
      let termLabel = "Month(s)"
      let term = this.state.term;
      if (this.state.term === "1") {
        termLabel = "Weekly"
        term = 1
      } else {
        term = term / 4
      }
      Alert.alert(
        'Summary your information',
        'Amount: ' + this.state.amount + '\n' +
        'Age: ' + this.state.age + '\n' +
        'Bank Account: ' + this.state.bankAccount + '\n' +
        'Bank Name: ' + this.state.bankName + '\n' +
        'Term: ' + term + " " + termLabel,
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'Apply Loan', onPress: () => this.applyLoan() },
        ],
        { cancelable: false }
      )
    } else {
      Alert.alert(
        'Warning',
        'Please enter Amount',
        [
          { text: 'Got it!' },
        ],
        { cancelable: false }
      )
      Toast.show({
        text: "Please enter Amount",
        style: {
          backgroundColor: "red"
        }
      })
    }
  }

  applyLoan() {
    let now = moment();
    let created = updated = now.format("D-M-Y hh:mm:ss");
    let term = this.state.term;
    // Create loan
    // Loan
    let loan = firebase.database().ref('/loans').push(
      {
        userId: 1,
        created: created,
        amount: this.state.amount,
        status: 'approving',
        term: term,
        profile: {
          bankName: this.state.bankName,
          bankAccount: this.state.bankAccount,
          age: this.state.age
        }
      }
    )

    console.log('=--------------')
    console.log(loan)
    console.log(loan.key)
    console.log('=--------------')

    // Generate schedule
    let loan_id = loan.key
    for (let i = 0; i < term; i++) {
      let start = moment().add(i, 'weeks');
      let end = moment().add(i + 1, 'weeks');
      let obj = {
        userId: 1,
        term: term,
        sequence: i + 1,
        status: 0,
        start: start,
        end: end,
        loan_id: loan_id,
        created: now,
        updated: now,
      }
      firebase.database().ref('/schedules').push(obj)
    }

    // Push to success page
    this.props.navigation.navigate("ApplyLoanSuccess")
  }

  formatAmount() {
    return Number(this.state.amount).toLocaleString()
  }

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content"/>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          </Left>
          <Body>
          <Title>Apply Loan</Title>
          </Body>
          <Right/>
        </Header>

        <Content>
          <View style={styles.formContainer}>
            <View style={styles.formData}>
              <Text>Amount = SGD {this.formatAmount()}</Text>
              <TextInput
                style={[styles.textInput, styles.textRequired]}
                onChangeText={(amount) => this.setState({ amount })}
                value={this.state.amount}
                keyboardType={'numeric'}
                placeholder="Total amount you need to loan"

              />
            </View>

            <View style={styles.formData}>
              <Text>Age</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(age) => this.setState({ age })}
                value={this.state.age}
                keyboardType={'numeric'}
                placeholder="Your age"
              />
            </View>

            <View style={styles.formData}>
              <Text>Bank Account</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(bankAccount) => this.setState({ bankAccount })}
                value={this.state.bankAccount}
                placeholder="Bank Account"
              />
            </View>

            <View style={styles.formData}>
              <Text>Bank Name</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(bankName) => this.setState({ bankName })}
                value={this.state.bankName}
                placeholder="Bank Name"
              />
            </View>

            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: "#4CDA64" }}>
                  <Icon name="arrow-dropdown"/>
                </Button>
              </Left>
              <Body>
              <Text>Pick Term</Text>
              </Body>
              <Right>
                <Picker
                  note
                  iosHeader="Terms"
                  iosIcon={<Icon name="ios-arrow-down-outline"/>}
                  mode="dropdown"
                  selectedValue={this.state.term}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Item label="1 Week" value="1"/>
                  <Item label="1 Month" value="4"/>
                  <Item label="3 Months" value="12"/>
                  <Item label="6 Months" value="24"/>
                  <Item label="12 Months" value="48"/>
                </Picker>
              </Right>
            </ListItem>

            <View style={styles.termNote}>
              <Text style={styles.termNoteText}>*Note: All the loans will paid as a “weekly” repayment frequency.</Text>
              <Text style={styles.termNoteText}>- 1 Week = 1 week</Text>
              <Text style={styles.termNoteText}>- 1 Month = 4 weeks</Text>
            </View>

          </View>


        </Content>

        <View style={styles.checkDataButton}>
          <Button
            style={[styles.actionButton, { backgroundColor: '#4fdda5' }]}
            onPress={() => this.validateData()}
          >
            <Text style={styles.actionText}>Check Data</Text>
          </Button>
        </View>

      </Container>
    );
  }
}

export default ApplyLoan;
