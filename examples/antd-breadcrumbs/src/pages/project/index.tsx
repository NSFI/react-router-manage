import React from "react";

interface ProjectProps {
  id?: number;
}

const modulePrefix = "Project";
const Project: React.FC<ProjectProps> = (props: ProjectProps) => {
  return <div className={modulePrefix}>Project</div>;
};

export default Project;
