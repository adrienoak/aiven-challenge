import { ReactNode } from "react";
import { useHref, useLocation, useNavigate, useParams } from "react-router-dom";
import { useIsGeoLocationAccepted } from "../../context";
import { ROUTES } from "../../routes";
import { Option } from "../Option";
import { useLayout } from "./layout.hook";

interface ILayoutProps {
  children: ReactNode;
}

export function Layout({ children }: ILayoutProps) {
  const { isAccepted, navigate, pathname } = useLayout();

  return (
    <>
      <nav className="h-20 bg-orange-600/40 bg-brandGrey"></nav>
      <div className="mt-10">
        <div className="flex flex-wrap gap-4 md:justify-center ">
          <Option
            option="Provider"
            onClick={() => {
              navigate(ROUTES.HOME_PAGE);
            }}
            current={pathname === "/"}
          />
          <Option
            option="Region"
            onClick={() => {
              navigate(ROUTES.REGION);
            }}
            current={pathname.includes("region")}
          />
          <Option
            onClick={() => {
              navigate(ROUTES.PROVIDER_AND_REGION);
            }}
            option="Region and Provider"
            current={pathname.includes("combined")}
          />
          <Option
            onClick={() => {
              if (isAccepted) {
                navigate(ROUTES.PROXIMITY);
              }
            }}
            option="Proximity"
            enabled={isAccepted}
            current={pathname.includes("proximity")}
          />
        </div>
        {children}
      </div>
    </>
  );
}
