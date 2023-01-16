import React from 'react';

interface ListViewProps {
    id?: number;
}

const modulePrefix = 'ListView';
const ListView: React.FC<ListViewProps> = (props: ListViewProps) => {
    return (<div className={modulePrefix}>ListView</div>);
};

export default ListView;
