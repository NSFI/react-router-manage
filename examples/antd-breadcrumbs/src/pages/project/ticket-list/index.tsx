import React from "react";

interface TicketListProps {
  id?: number;
}

const modulePrefix = "TicketList";
const TicketList: React.FC<TicketListProps> = (props: TicketListProps) => {
  return <div className={modulePrefix}>TicketList</div>;
};

export default TicketList;
