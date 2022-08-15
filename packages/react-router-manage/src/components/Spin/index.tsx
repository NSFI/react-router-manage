import React from 'react'
const Spin:React.FC<{tip: string}> = ({tip = "加载中"})  => {
  return <div>{tip}</div>;
}

export default Spin;
