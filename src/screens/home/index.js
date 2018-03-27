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
          <Title>HOME</Title>
          </Body>
          <Right/>
        </Header>

        <View style={styles.logoContainer}>

          <Button
            style={[styles.actionButton, { backgroundColor: '#639fff' }]}
            onPress={() => this.props.navigation.navigate("Approver")}
          >
            <Text style={styles.actionText}>Approver</Text>
          </Button>

          <Text style={styles.note}>(This place is for approver tracking loans.</Text>

          <View style={{ height: 5, backgroundColor: '#CCC', width: 200, margin: 40 }}>
          </View>

          <Button
            style={[styles.actionButton, { backgroundColor: '#4fdda5' }]}
            onPress={() => this.props.navigation.navigate("User")}
          >
            <Text style={styles.actionText}>User</Text>
          </Button>
          <Text style={styles.note}>(This place is for user apply loan and repayment. </Text>
        </View>
      </Container>
    );
  }
}

export default Home;
