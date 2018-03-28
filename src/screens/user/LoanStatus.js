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
  Toast,
  Card,
  CardItem
} from "native-base";
import firebase from 'react-native-firebase';
import moment from 'moment'

import styles from "./styles";

class LoanStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loans: [],
      schedules: []
    };
  }

  componentDidMount() {
    this.callFirebase()
  }

  callFirebase(){
    // Load
    let loans = []
    loans['rejected'] = [];
    loans['approving'] = [];
    loans['confirmed'] = [];

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
          if (snapshot[key].status === 'rejected') {
            loans['rejected'].push(value);
          } else if (snapshot[key].status === 'approving') {
            loans['approving'].push(value);
          } else if (snapshot[key].status === 'confirmed') {
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

  renderSchedule(key) {
    let schedules = [];
    let now = moment();
    if (typeof this.state.schedules !== 'undefined' && this.state.schedules.length > 0) {
      for (let i = 0; i < this.state.schedules.length; i++) {
        if (this.state.schedules[i].loan_id === key) {
          let active = moment().isBetween(this.state.schedules[i].start, this.state.schedules[i].end);

          schedules.push(
            <View key={i} style={[styles.sequence, active ? styles.sequenceActive : '']}>
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
          )
        }
      }
    }

    return schedules;
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
    debugger;
    return (
      <Container>
        <StatusBar barStyle="light-content"/>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.push('User')}>
              <Icon name="pulse"/>
            </Button>
          </Left>
          <Body>
          <Title>Loan Status</Title>
          </Body>
          <Right/>
        </Header>

        <Content>
          <Separator bordered>
            <Text>APPROVING</Text>
          </Separator>
          <ListItem>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              {this.renderLoans('approving').approving}
            </View>
          </ListItem>

          <Separator bordered>
            <Text>CONFIRMED</Text>
          </Separator>
          <ListItem>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              {this.renderLoans('confirmed').confirmed}
            </View>
          </ListItem>
          <Separator bordered>
            <Text>REJECTED</Text>
          </Separator>
          <ListItem>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              {this.renderLoans('rejected').rejected}
            </View>
          </ListItem>

        </Content>


      </Container>
    );
  }
}

export default LoanStatus;
