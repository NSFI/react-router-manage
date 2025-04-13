import React from "react";

interface MessengerProps {
  id?: number;
}

const modulePrefix = "Messenger";
const Messenger: React.FC<MessengerProps> = (props: MessengerProps) => {
  return <div className={modulePrefix}>Messenger</div>;
};

export default Messenger;
