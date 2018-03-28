import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import Home from "./screens/home/";

import Approver from "./screens/approver/";
import ApproverApproveLoan from "./screens/approver/ApproveLoan";
import ApproverApproveLoanStatus from "./screens/approver/ApproveLoanStatus";

import User from "./screens/user/";
import UserApplyLoan from "./screens/user/ApplyLoan";
import UserApplyLoanSuccess from "./screens/user/ApplyLoanSuccess";
import UserLoanStatus from "./screens/user/LoanStatus";
import UserPayLoan from "./screens/user/PayLoan";

import SideBar from "./screens/sidebar";

const Drawer = DrawerNavigator(
  {
    Home: { screen: Home },

    Approver: { screen: Approver },
    ApproverApproveLoan: { screen: ApproverApproveLoan },
    ApproverApproveLoanStatus: { screen: ApproverApproveLoanStatus },

    User: { screen: User },
    UserApplyLoan: { screen: UserApplyLoan },
    UserApplyLoanSuccess: { screen: UserApplyLoanSuccess },
    UserLoanStatus: { screen: UserLoanStatus },
    UserPayLoan: { screen: UserPayLoan },

  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer },

    ApproveLoan: { screen: ApproverApproveLoan },
    ApproveLoanStatus: { screen: ApproverApproveLoanStatus },

    User: { screen: User },
    ApplyLoan: { screen: UserApplyLoan },
    ApplyLoanSuccess: { screen: UserApplyLoanSuccess },
    LoanStatus: { screen: UserLoanStatus },
    PayLoan: { screen: UserPayLoan },
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <AppNavigator/>
  </Root>;
