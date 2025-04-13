import React from "react";

interface TaskBoardProps {
  id?: number;
}

const modulePrefix = "TaskBoard";
const TaskBoard: React.FC<TaskBoardProps> = (props: TaskBoardProps) => {
  return <div className={modulePrefix}>TaskBoard</div>;
};

export default TaskBoard;
