import React from 'react';

interface EmailProps {
    id?: number;
}

const modulePrefix = 'Email';
const Email: React.FC<EmailProps> = (props: EmailProps) => {
    return (<div className={modulePrefix}>Email</div>);
};

export default Email;
