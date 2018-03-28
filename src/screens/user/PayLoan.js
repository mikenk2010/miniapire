import React, { Component } from "react";
import { Alert, View, StatusBar, TextInput, TouchableOpacity } from "react-native";
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
import moment from 'moment'

import styles from "./styles";

const Item = Picker.Item;

class PayLoan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loans: [],
      schedules: []
    };
  }

  componentDidMount() {
    // Load
    let loans = []
    loans['rejected'] = [];
    loans['applying'] = [];
    loans['confirmed'] = [];

    firebase.database().ref('/schedules').on('value', (snapshot) => {
      if (typeof snapshot !== 'undefined' && snapshot.val() !== null) {
        let snapshots = snapshot.val();
        for (key in snapshots) {
          snapshots[key].key = key
        }

        let schedules = Object.values(snapshots);
        schedules.sort(function (a, b) {
          return a.sequence - b.sequence;
        });

        this.setState({ schedules })
      }
    });


    firebase.database().ref('/loans').on('value', (snapshot) => {
      if (typeof snapshot !== 'undefined' && snapshot.val() !== null) {
        snapshot = snapshot.val()
        for (key in snapshot) {
          var value = snapshot[key];
          value.key = key
          if (snapshot[key].status == 'rejected') {
            loans['rejected'].push(value);
          } else if (snapshot[key].status == 'applying') {
            loans['applying'].push(value);
          } else if (snapshot[key].status == 'confirmed') {
            loans['confirmed'].push(value);
          }
        }

        this.setState({ loans })
      }
    });
  }

  formatAmount(num) {
    return Number(num).toLocaleString()
  }

  validatePayTerm = (loan_id, status, active, key, start) => {
    if (status === 0 && active) {
      Alert.alert(
        'Are you sure to pay this term ?',
        key,
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'Yes, I\'m sure', onPress: () => this.purchaseLoan(key) },
        ],
        { cancelable: false }
      )
    } else {
      if (status == 1 && active) {
        Alert.alert(
          'Success!',
          'You already paid this term, please skip this!',
          [
            { text: 'Okie lah!', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          ],
          { cancelable: false }
        )
      } else {
        Alert.alert(
          'Notice!',
          'This term is not yet reached, please wait to ' + start + ' date.',
          [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          ],
          { cancelable: false }
        )
      }
    }
  }

  purchaseLoan(key) {
    let now = moment();
    let updated = now.format("D-M-Y hh:mm:ss");
    let schedule = firebase.database().ref('/schedules/' + key);
    schedule.update({ status: 1, updated: updated })
  }

  renderSchedule(key) {
    let schedules = [];
    for (let i = 0; i < this.state.schedules.length; i++) {
      if (this.state.schedules[i].loan_id === key) {
        let active = moment().isBetween(this.state.schedules[i].start, this.state.schedules[i].end);
        schedules.push(
          <TouchableOpacity key={i} onPress={() => this.validatePayTerm(this.state.schedules[i].loan_id, this.state.schedules[i].status, active, this.state.schedules[i].key, this.state.schedules[i].start)}>
            <View style={[styles.sequence, this.state.schedules[i].status === 1 ? styles.sequenceDone : active ? styles.sequenceActive : '']}>
              <Text style={[styles.sequenceText]}>
                Sequence: {this.state.schedules[i].sequence}
              </Text>
              <Text style={[styles.sequenceText, this.state.schedules[i].status === 0 ? styles.sequenceTextWarning : styles.sequenceTextDone]}>
                Status: {this.state.schedules[i].status === 1 ? 'PAID' : 'UNPAID'}
              </Text>
              <Text style={styles.sequenceText}>
                Start: {this.state.schedules[i].start}
              </Text>
              <Text style={styles.sequenceText}>
                End: {this.state.schedules[i].end}
              </Text>
            </View>
          </TouchableOpacity>
        )
      }
    }

    return schedules;
  }

  getCurrentState(key) {
    let state = 0;
    for (let i = 0; i < this.state.schedules.length; i++) {
      if (this.state.schedules[i].loan_id === key) {
        let active = moment().isBetween(this.state.schedules[i].start, this.state.schedules[i].end);
        if (active && this.state.schedules[i].status === 1) {
          state += 1;
        }
      }
    }
    return state
  }

  renderLoans(type) {
    let loanRenders = []
    loanRenders[type] = []
    let loans = this.state.loans
    if (typeof loans[type] !== 'undefined' && loans[type].length > 0) {
      for (a in loans[type]) {
        loanRenders[type].push(
          <View key={a} style={styles.formatList}>
            <Card style={styles.mb}>
              <CardItem header>
                <Text>{loans[type][a].key}</Text>
              </CardItem>
              <CardItem>
                <Body>
                <Text>
                  Amount: {this.formatAmount(loans[type][a].amount)}
                </Text>
                <Text>
                  Term: {loans[type][a].term} weeks
                </Text>
                </Body>
              </CardItem>

              <CardItem>
                <Body>
                <Text>
                  Age: {loans[type][a].profile.age}
                </Text>
                <Text>
                  Bank: {loans[type][a].profile.bankAccount}
                </Text>
                <Text>
                  Bank Name: {loans[type][a].profile.bankName}
                </Text>
                </Body>
              </CardItem>

              <CardItem>
                <Body>
                <Text>
                  Current state: {this.getCurrentState(loans[type][a].key)}/{loans[type][a].term}
                </Text>
                <Text>
                  Schedules
                </Text>
                {this.renderSchedule(loans[type][a].key)}
                </Body>
              </CardItem>
              <CardItem footer>
                <Text>Created: {loans[type][a].created}</Text>
              </CardItem>
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
            <Button transparent onPress={() => this.props.navigation.navigate("User")}>
              <Icon name="arrow-back"/>
            </Button>
          </Left>
          <Body>
          <Title>Pay Loan</Title>
          </Body>
          <Right/>
        </Header>

        <Content>
          <Separator bordered>
            <Text>CURRENT LOAN YOU NEED TO CUT</Text>
          </Separator>
          <ListItem>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              {this.renderLoans('confirmed').confirmed}
            </View>
          </ListItem>

        </Content>


      </Container>
    );
  }
}

export default PayLoan;
