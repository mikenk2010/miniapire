import React, { Component } from "react";
import { ImageBackground, View, StatusBar } from "react-native";
import { Footer, Container, Button, H3, Text, Content, Left, Header, Icon, Body, Title, Right } from "native-base";
import firebase from 'react-native-firebase';
import moment from 'moment'

import styles from "./styles";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      loans: [],
      schedules: []
    }
  }

  componentDidMount() {
    // Load
    firebase.database().ref('/users').on('value', (snapshot) => {
      this.setState({ user: (snapshot.val()[0]) })
    });

    let loans = []
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
          if (snapshot[key].status === 'confirmed') {
            loans['confirmed'].push(value);
          }
        }
        this.setState({ loans })
      }
    });
  }

  getNextPaymentTerm() {
    let nextTerm = ''
    let loans = this.state.loans
    if (typeof loans['confirmed'] !== 'undefined' && loans['confirmed'].length > 0) {
      for (a in loans['confirmed']) {

        if (typeof this.state.schedules !== 'undefined' && this.state.schedules.length > 0) {
          for (let i = 0; i < this.state.schedules.length; i++) {
            if (this.state.schedules[i].loan_id === loans['confirmed'][a].key) {
              let active = moment().isBetween(this.state.schedules[i].start, this.state.schedules[i].end);
              if (!active) {
                console.log(this.state.schedules[i], active)
                nextTerm =this.state.schedules[i].start
                break;
              }

            }
          }
        }

      }
    }
    return nextTerm;
  }

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content"/>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="ios-menu"/>
            </Button>
          </Left>
          <Body>
          <Title>{this.state.user.name} [{this.state.user.username}]</Title>
          </Body>
        </Header>

        <Content style={{ flex: 1, backgroundColor: '#FFF' }}>
          <View style={styles.container}>
            <Button
              style={[styles.actionButton, { backgroundColor: '#639fff' }]}
              onPress={() => this.props.navigation.navigate("ApplyLoan")}
            >
              <Text style={styles.actionText}>Apply Loan</Text>
            </Button>

            <Text style={styles.note}>(Click to apply loan)</Text>

            <View style={{ height: 5, backgroundColor: '#CCC', width: 200, margin: 40 }}>
            </View>

            <Button
              style={[styles.actionButton, { backgroundColor: '#4fdda5' }]}
              onPress={() => this.props.navigation.navigate("LoanStatus")}
            >
              <Text style={styles.actionText}>Loan Status</Text>
            </Button>
            <Text style={styles.note}>(View current load and loan history)</Text>

            <View style={{ height: 5, backgroundColor: '#CCC', width: 200, margin: 40 }}>
            </View>

            <Button
              style={[styles.actionButton, { backgroundColor: '#c62d89' }]}
              onPress={() => this.props.navigation.navigate("PayLoan")}
            >
              <Text style={styles.actionText}>Pay Loan</Text>
            </Button>
            <Text style={styles.note}>(Pay Loan)</Text>

          </View>
        </Content>
        <Footer>
         <View>
           <Text style={styles.footerText}>
             Next term: {this.getNextPaymentTerm()}
           </Text>
         </View>
        </Footer>
      </Container>
    );
  }
}

export default Home;
