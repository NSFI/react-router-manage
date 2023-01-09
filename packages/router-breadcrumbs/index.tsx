import React from 'react';

interface RouterBreadcrumbsProps {
    id?: number;
}

const modulePrefix = 'RouterBreadcrumbs';
const RouterBreadcrumbs: React.FC<RouterBreadcrumbsProps> = (props: RouterBreadcrumbsProps) => {
    return (<div className={modulePrefix}></div>);
};

export default RouterBreadcrumbs;
