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

        <View style={styles.logoContainer}>

          <Button
            style={[styles.actionButton, { backgroundColor: '#639fff' }]}
            onPress={() => this.props.navigation.navigate("Approver1")}
          >
            <Text style={styles.actionText}>Approver</Text>
          </Button>

          <Text style={styles.note}>(This place is for approver tracking loans.</Text>

        </View>
      </Container>
    );
  }
}

export default Home;
