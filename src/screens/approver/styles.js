const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
  imageContainer: {
    flex: 1,
    width: null,
    height: null,
    opacity: 0.5

  },
  logoContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: "center",
    paddingTop: 50
  },
  logo: {
    position: "absolute",
    left: Platform.OS === "android" ? 40 : 50,
    top: Platform.OS === "android" ? 35 : 60,
    width: 280,
    height: 100
  },
  text: {
    color: "#D8D8D8",
    bottom: 6,
    marginTop: 5
  },
  note: {
    margin: 10,
    fontSize: 14
  },
  actionButton: {
    backgroundColor: "#6FAF98",
    alignSelf: "center",
    alignItems: "center",
    width: 200
  },
  actionText:{
    textAlign:"center",
    flex:1
  }
};
