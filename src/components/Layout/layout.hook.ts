import { useNavigate, useLocation } from "react-router-dom";
import { useIsGeoLocationAccepted } from "../../context";

export function useLayout() {
  const isAccepted = useIsGeoLocationAccepted();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return { isAccepted, navigate, pathname };
}
