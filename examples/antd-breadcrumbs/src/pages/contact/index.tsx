import React from "react";

interface ContactProps {
  id?: number;
}

const modulePrefix = "Contact";
const Contact: React.FC<ContactProps> = (props: ContactProps) => {
  return <div className={modulePrefix}>Contact</div>;
};

export default Contact;
