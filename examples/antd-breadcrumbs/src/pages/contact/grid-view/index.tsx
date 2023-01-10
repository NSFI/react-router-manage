import React from 'react';

interface GridViewProps {
    id?: number;
}

const modulePrefix = 'GridView';
const GridView: React.FC<GridViewProps> = (props: GridViewProps) => {
    return (<div className={modulePrefix}>GridView</div>);
};

export default GridView;
