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
    width: 120,
    margin: 10
  },
  actionText: {
    textAlign: "center",
    flex: 1
  },
  footerText: {
    margin: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: "center",
    paddingTop: 50
  },
  textInput: {
    height: 40,
    width: 350,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: "center",
    padding: 5
  },
  formData: {
    marginBottom: 10
  },
  formContainer: {
    marginLeft: 15,
    marginTop: 10
  },
  textRequired: {
    borderColor: 'red',
  },
  termNote: {
    margin: 10,

  },
  termNoteText: {
    fontSize: 10
  },
  checkDataButton: {
    marginBottom: 30
  },
  formatList: {
    flex: 1,
  },
  formatTermText: {
    textAlign: 'left'
  },
  mb: {
    marginBottom: 15
  },
  sequence: {
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    padding: 5,
    width: 300
  },
  sequenceActive: {
    borderColor: 'red',
  },
  sequenceDone: {
    borderColor: 'green',
  },
  sequenceWarning: {
    borderColor: 'orange',
  },
  sequenceText: {
    color: '#276bd8',
    fontSize: 13,
  },
  sequenceTextDone: {
    color: 'green',
  },
  sequenceTextWarning: {
    color: 'orange',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
};
