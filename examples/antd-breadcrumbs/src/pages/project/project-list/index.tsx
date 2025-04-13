import React from "react";

interface ProjectListProps {
  id?: number;
}

const modulePrefix = "ProjectList";
const ProjectList: React.FC<ProjectListProps> = (props: ProjectListProps) => {
  return <div className={modulePrefix}>ProjectList</div>;
};

export default ProjectList;
