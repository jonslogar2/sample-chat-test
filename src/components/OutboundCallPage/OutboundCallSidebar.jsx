import { Actions, SideLink } from "@twilio/flex-ui";

const OutboundCallSidebar = ({ activeView }) => {
  function navigate() {
    Actions.invokeAction("NavigateToView", { viewName: "outbound-call-view" });
  }
  
  return (
    <SideLink
      showLabel={true}
      icon="Call"
      iconActive="CallBold"
      isActive={activeView === "outbound-call-view"}
      onClick={navigate}
    >
      Oubound Call
    </SideLink>
  );
};

export default OutboundCallSidebar;
