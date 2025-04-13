import React from "react";
import { useRouter } from "react-router-manage";

interface DetailProps {
  id?: number;
}

const Detail: React.FC<DetailProps> = (props: DetailProps) => {
  const { params } = useRouter();
  return <div>current dashboard id is {params.id}</div>;
};

export default Detail;
