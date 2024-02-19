import { Actions } from "@twilio/flex-ui";

const OutboundCallView = () => {
  const handleOutboundCall = () => {
    const taskAttributes = {
      channel: "voice",
      callType: "inbound_outbound",
    };

    console.log(`OUTSIDE TASKS ATTRIBUTE`, taskAttributes);

    Actions.invokeAction("StartOutboundCall", {
      destination: "+12186703495",
      queueSid: "WQ16c91dfc85ba20cf3a28371353a5a7c4",
      taskAttributes: JSON.stringify(taskAttributes),
    });
    console.log(`INSIDE TASKS ATTRIBUTE`, taskAttributes);
  };

  return (
    <section>
      <h1>
        Calling this Twilio Phone Number:{" "}
        <span style={{ fontWeight: "bold" }}>+12186703495</span>
      </h1>
      <button onClick={handleOutboundCall}>Outbound Call</button>
    </section>
  );
};

export default OutboundCallView;
