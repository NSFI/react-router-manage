import React from 'react';
import ReactDOM from 'react-dom';


const modulePrefix = 'Page1';
const App: React.FC = () => {
    return (<div className={modulePrefix}>antd-breadcrumbs</div>);
};

ReactDOM.render(<App />, document.getElementById("root"));
