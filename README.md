# React Native Project

## Description
The project focuses on creating a mini version of Aspire so that the candidate can think about the systems and architecture the real project would have. The task is defined below:

Build a simple React Native App that allows the candidate to go through a loan application (doesn’t have to contain too many fields, but at least “amount required” and “loan term”). All the loans will be assumed to have a “weekly” repayment frequency.

After the loan is approved the user must be able to submit the weekly loan repayments. It can be a simple repay button, which won’t need to check if the dates are correct, but will just set the weekly amount to be repaid.
The app should use an API architecture, where dummy data can be returned from the APIs directly within React Native code. No need to create a backend infrastructure.

## Installation

*	**Clone and install packages**
```
git clone git@github.com:mikenk2010/miniapire.git
cd miniapire
npm install
react-native link
```

*	**Run on iOS**
	*	Run `react-native run-ios` in your terminal

*	**Run on Android**
	*	Make sure you have an `Android emulator` installed and running
	*	Run `react-native run-android` in your terminal

## Actor
### User
- Apply loan by pre-defined terms (1 week, 1 month, 3 months, 6 months or 12 months)
- Pay loan

### Approver
- Approve/Reject loan 
- Check status loan


## Video Demo
![Image](miniaspire.gif)

## Images Demo
- Home

![Image](https://i.imgur.com/ab7B5Er.png)

- Rejected

![Image](https://i.imgur.com/TJiXu4V.png)

- Rejected list

![Image](https://i.imgur.com/OzWB3vk.png)

