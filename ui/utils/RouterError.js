import {
  faBomb,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouteError } from "react-router-dom";

const RouterError = () => {
  const error = useRouteError();
  return (
    <div className="error-wrapper">
      <div className="error-content">
        <div className="error-header">
          <FontAwesomeIcon icon={faTriangleExclamation} className="icon" />
          <span className="title">ROUTER ERROR!</span>
        </div>
        <div className="error-body">
          <p>
            <span>Error Message:</span> {error?.error?.message}
          </p>
          <p>
            <span>Status:</span> {error?.status}
          </p>
          <p>
            <span>Status Text:</span> {error?.statusText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RouterError;
