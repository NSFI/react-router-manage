import React from "react";

interface ClientProps {
  id?: number;
}

const modulePrefix = "Client";
const Client: React.FC<ClientProps> = (props: ClientProps) => {
  return <div className={modulePrefix}>Client</div>;
};

export default Client;
