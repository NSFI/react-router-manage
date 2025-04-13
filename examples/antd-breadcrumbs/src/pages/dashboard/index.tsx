import React from "react";
import { Button } from "antd";
import { useRouter } from "react-router-manage";

interface DashboardProps {
  id?: number;
}

const modulePrefix = "Dashboard";
const Dashboard: React.FC<DashboardProps> = (props: DashboardProps) => {
  const { navigate, routesMap } = useRouter();
  return (
    <div className={modulePrefix}>
      <ol>
        <li>
          <Button
            onClick={() => {
              navigate(routesMap.DashBoardDetail.path, {
                params: { id: 1 }
              });
            }}
          >
            view dashboard 1 detail
          </Button>
        </li>
        <li>
          <Button
            onClick={() => {
              navigate(routesMap.DashBoardDetail.path, {
                params: { id: 2 }
              });
            }}
          >
            view dashboard 2 detail
          </Button>
        </li>
      </ol>
    </div>
  );
};

export default Dashboard;
