import React, { Component } from "react";
import { ImageBackground, View, StatusBar } from "react-native";
import { Container, Button, H3, Text, Content, Left, Header, Icon, Body, Title, Right } from "native-base";

import styles from "./styles";

class Home extends Component {
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
          <Title>APPROVER</Title>
          </Body>
          <Right/>
        </Header>

        <Content style={{ flex: 1, backgroundColor: '#FFF' }}>
          <View style={styles.container}>
            <Button
              style={[styles.actionButton, { backgroundColor: '#639fff' }]}
              onPress={() => this.props.navigation.navigate("ApproveLoan")}
            >
              <Text style={styles.actionText}>List Loans</Text>
            </Button>

            <Text style={styles.note}>(Click to approve Loans)</Text>

            <View style={{ height: 5, backgroundColor: '#CCC', width: 200, margin: 40 }}>
            </View>

            <Button
              style={[styles.actionButton, { backgroundColor: '#4fdda5' }]}
              onPress={() => this.props.navigation.navigate("ApproveLoanStatus")}
            >
              <Text style={styles.actionText}>Loan Status</Text>
            </Button>
            <Text style={styles.note}>(View current load and loan history)</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Home;
