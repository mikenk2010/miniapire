import React, { Component } from "react";
import { Alert, View, TouchableOpacity, StatusBar } from "react-native";
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
  Toast,
  Card,
  CardItem
} from "native-base";

import firebase from 'react-native-firebase';
import styles from "./styles";
import moment from 'moment'

class ApproveLoan extends Component {

  constructor(props) {
    super(props);

    this.state = {
      updated: '11',
      loans: [],
      schedules: []
    };
  }

  componentWillMount() {
    // Load
    this.callFirebase()
  }

  callFirebase() {
    let loans = []
    loans['approving'] = [];

    firebase.database().ref('/schedules').on('value', (snapshotSchedule) => {
      if (typeof snapshotSchedule !== 'undefined' && snapshotSchedule.val() !== null) {
        let schedules = Object.values(snapshotSchedule.val());
        schedules.sort(function (a, b) {
          return a.sequence - b.sequence;
        });
        this.setState({ schedules })
      }
    });

    firebase.database().ref('/loans').on('value', (snapshotLoan) => {
      if (typeof snapshotLoan !== 'undefined' && snapshotLoan.val() !== null) {
        let snapshot = snapshotLoan.val();
        for (key in snapshot) {
          let value = snapshot[key];
          value.key = key
          if (snapshot[key].status === 'approving') {
            loans['approving'].push(value);
          }
        }


        this.setState({ loans })
      }
    });
  }

  formatAmount(num) {
    return Number(num).toLocaleString()
  }

  validateLoan(loan, action) {
    let titeMsg = actionText = ''
    if (action === 'rejected') {
      titeMsg = 'Are you sure to reject this loan ?'
      actionText = 'Reject Loan'
    } else if (action === 'confirmed') {
      titeMsg = 'Are you sure to approve this loan ?'
      actionText = 'Approve Loan'
    }

    Alert.alert(
      titeMsg,
      'Amount: ' + this.formatAmount(loan.amount) + '\n' +
      'Age: ' + loan.age + '\n' +
      'Bank Account: ' + loan.profile.bankAccount + '\n' +
      'Bank Name: ' + loan.profile.bankName + '\n' +
      'Key: ' + loan.key + '\n' +
      'Term: ' + loan.term + " Week",
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: actionText, onPress: () => this.updateLoan(loan.key, action) },
      ],
      { cancelable: false }
    )

  }

  updateLoan(key, action) {
    let now = moment();
    let updated = now.format("D-M-Y hh:mm:ss");
    let schedule = firebase.database().ref('/loans/' + key);
    schedule.update({ status: action, updated: updated })
    this.setState({ updated: updated })
    this.callFirebase()
  }

  renderLoans() {

    let loanRenders = []
    let loans = this.state.loans['approving']
    if (typeof loans !== 'undefined' && loans.length > 0) {
      for (let i = 0; i < loans.length; i++) {
        loanRenders.push(
          <View key={i + 1} style={styles.formatList}>
            <Card style={styles.mb}>
              <CardItem header>
                <Text>{loans[i].key}</Text>
              </CardItem>
              <CardItem>
                <Body>
                <Text>Amount: {this.formatAmount(loans[i].amount)}</Text>
                <Text>Term: {loans[i].term} weeks</Text>
                </Body>
              </CardItem>

              <CardItem>
                <Body>
                <Text>Age: {loans[i].profile.age}</Text>
                <Text>Bank: {loans[i].profile.bankAccount}</Text>
                <Text>Bank Name: {loans[i].profile.bankName}</Text>
                <Text>Status: {loans[i].status}</Text>
                </Body>
              </CardItem>

              <CardItem footer>
                <Text>Created: {loans[i].created}</Text>
              </CardItem>

              <View style={styles.actions}>
                <Button
                  style={[styles.actionButton, { backgroundColor: '#ed2557' }]}
                  onPress={() => this.validateLoan(loans[i], 'rejected')}
                >
                  <Text style={styles.actionText}>Reject</Text>
                </Button>

                <Button
                  style={[styles.actionButton, { backgroundColor: '#4fdda5' }]}
                  onPress={() => this.validateLoan(loans[i], 'confirmed')}
                >
                  <Text style={styles.actionText}>Approve</Text>
                </Button>
              </View>
            </Card>
          </View>
        )
      }
    }

    return loanRenders;
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
          <Title>List</Title>
          </Body>
          <Right/>
        </Header>

        <Content>
          <ListItem>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              {this.renderLoans()}
            </View>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

export default ApproveLoan;
