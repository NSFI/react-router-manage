import React from 'react';

interface ToDoListProps {
    id?: number;
}

const modulePrefix = 'ToDoList';
const ToDoList: React.FC<ToDoListProps> = (props: ToDoListProps) => {
    return (<div className={modulePrefix}>ToDoList</div>);
};

export default ToDoList;
