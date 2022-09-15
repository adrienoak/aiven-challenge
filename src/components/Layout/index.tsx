import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useIsGeoLocationAccepted } from "../../context";
import { ROUTES } from "../../routes";
import { Option } from "../Option";
import { useLayout } from "./layout.hook";

interface ILayoutProps {
  children: ReactNode;
}

export function Layout({ children }: ILayoutProps) {
  const { isAccepted, send } = useLayout();
  const navigate = useNavigate();

  return (
    <>
      <nav className="h-20 bg-orange-600/40"></nav>
      <div className="mt-10">
        <div className="flex justify-center space-x-40">
          <Option
            option="Provider"
            onClick={() => {
              send("By Provider");
              navigate(ROUTES.HOME_PAGE);
            }}
          />
          <Option
            option="Region"
            onClick={() => {
              send("By Location");
              navigate(ROUTES.REGION);
            }}
          />
          <Option
            onClick={() => {
              if (isAccepted) {
                send("By Proximity");
                navigate(ROUTES.PROXIMITY);
              }
            }}
            option="Proximity"
            enabled={isAccepted}
          />
        </div>
        {children}
      </div>
    </>
  );
}
