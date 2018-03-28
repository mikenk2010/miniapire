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
