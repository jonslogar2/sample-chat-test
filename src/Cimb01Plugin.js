import React from "react";
import { View } from "@twilio/flex-ui";
import { FlexPlugin } from "@twilio/flex-plugin";

import CustomTaskList from "./components/CustomTaskList/CustomTaskList";
// import OutboundCallView from "./components/OutboundCallPage/OutboundCallView";
// import OutboundCallSidebar from "./components/OutboundCallPage/OutboundCallSidebar";

import cimbLogo from "./assets/cimb-logo.png";
import cynLogo from "./assets/cyn-logo.jpeg";

const PLUGIN_NAME = "Cimb01Plugin";

export default class Cimb01Plugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    //Default CRM
    flex.CRMContainer.defaultProps.uriCallback = (task) => {
      return task
        ? `https://www.bing.com/search?q=${task.attributes.name}`
        : "https://www.bing.com";
    };

    // Update Flex Config to Enable "client:" to allowing calling to other "clients"
    flex.Manager.getInstance().updateConfig({ enableClientCalling: true });

    // Set Caller ID
    flex.Actions.replaceAction("StartOutboundCall", (payload, original) => {
      if (payload.destination.startsWith("client:")) {
        manager.user.identity
          ? (payload.callerId = `client:${manager.user.identity}`)
          : (payload.callerId = `client:voip`);
      }
      original(payload);
    });

    // Add a "from" field to allow accepting tasks on Flex UI
    flex.Actions.replaceAction("AcceptTask", (payload, original) => {
      if (
        !payload.conferenceOptions.from &&
        payload.task._task.attributes.caller &&
        payload.task._task.attributes.caller.startsWith("client:")
      ) {
        payload.conferenceOptions.from = payload.task._task.attributes.caller;
        console.log(
          `VoIP Plugin: Set conferenceOptions.from to ${payload.task._task.attributes.caller}`
        );
      }
      return original(payload);
    });

    const options = { sortOrder: -1 };

    // * Dismissable Text
    flex.AgentDesktopView.Panel1.Content.add(
      <CustomTaskList key="Cimb01Plugin-component" />,
      options
    );

    flex.MainHeader.Content.add(
      <div
        key="custom-header"
        style={{
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "10px",
          marginRight: "-27px",
        }}
      >
        <img
          src={cimbLogo}
          alt="CIMB Bank"
          style={{
            height: "18px",
            marginRight: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <p>CIMB Powered by</p>

        <img
          src={cynLogo}
          alt="CYN Solutions Inc."
          style={{ height: "30px", marginRight: "5px", marginLeft: "5px" }}
        />
        <p>CYN Solutions Inc. </p>
        <p style={{ fontSize: "19px", marginLeft: "8px" }}>X</p>
      </div>,
      { sortOrder: 1 }
    );

    // ! OUTBOUND CALL PAGE REMOVED
    // flex.SideNav.Content.add(
    //   <OutboundCallSidebar key="outbound-call-button" />
    // );

    // flex.ViewCollection.Content.add(
    //   <View name="outbound-call-view" key="outbound-call-view">
    //     <OutboundCallView />
    //   </View>
    // );
  }
}
