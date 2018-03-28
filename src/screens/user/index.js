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
      user: ''
    }
  }

  componentDidMount() {
    let config = {
      apiKey: "AIzaSyDaL5hl_8CtvkSwdiRs7MMk31mEP58qDBw",
      authDomain: "miniaspireapp.firebaseapp.com",
      databaseURL: "https://miniaspireapp.firebaseio.com",
      projectId: "miniaspireapp",
      storageBucket: "miniaspireapp.appspot.com",
      messagingSenderId: "751163378904"
    };

    console.log(config)

    let now = moment();
    let created = updated = now.format("D-M-Y hh:mm:ss");

    // var data = firebase.database().ref('/keys').push({
    //   id: 1,
    //   username: 'baonk',
    //   name: 'Bao Nguyen',
    //   create: created,
    //   updated: updated
    // })

    // firebase.database().ref('/users').set(
    //   [
    //     {
    //       id: 1,
    //       username: 'baonk',
    //       name: 'Bao Nguyen',
    //       create: created,
    //       updated: updated
    //     },
    //     {
    //       id: 2,
    //       username: 'jane',
    //       name: 'Jane',
    //       create: created,
    //       updated: updated
    //     },
    //     {
    //       id: 3,
    //       username: 'leo',
    //       name: 'Leo Ong',
    //       create: created,
    //       updated: updated
    //     },
    //   ],
    // )
    //
    //
    // // Define terms
    // firebase.database().ref('/terms').set(
    //   [
    //     {
    //       id: 1,
    //       label: 'Monthly',
    //       value: 4
    //     },
    //     {
    //       id: 2,
    //       label: 'Weekly',
    //       value: 1
    //     },
    //     {
    //       id: 1,
    //       label: 'Twice a week',
    //       value: 2
    //     },
    //   ]
    // )
    //
    // // Schedule
    // firebase.database().ref('/schedules').set(
    //   [
    //     {
    //       id: 1,
    //       loan_id: 1,
    //       user_id: 1,
    //       start: created,
    //       end: updated,
    //       status: 1
    //     },
    //     {
    //       id: 2,
    //       loan_id: 1,
    //       user_id: 1,
    //       start: created,
    //       end: updated,
    //       status: 1
    //     },
    //     {
    //       id: 3,
    //       loan_id: 1,
    //       user_id: 1,
    //       start: created,
    //       end: updated,
    //       status: 1
    //     },
    //   ]
    // )


    // Load
    firebase.database().ref('/users').on('value', (snapshot) => {
      this.setState({ user: (snapshot.val()[0]) })

    });

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
          <Text style={styles.footerText}>
            Next time to pay loan: 11-11-2012 12:2:1
          </Text>
        </Footer>
      </Container>
    );
  }
}

export default Home;
