import React from 'react';

interface MyPageProps {
    id?: number;
}

const modulePrefix = 'MyPage';
const MyPage: React.FC<MyPageProps> = (props: MyPageProps) => {
    return (<div className={modulePrefix}>MyPage</div>);
};

export default MyPage;
