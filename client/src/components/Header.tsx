import { useSelector } from "react-redux";
import { selectUserStatus } from "../redux";
import { Link } from "react-router";
import { Payments } from "./Payments";

export const Header = () => {
  const { isLoading, isLoggedIn, isNotLoggedIn, user } =
    useSelector(selectUserStatus);

  return (
    <nav>
      <div className="nav-wrapper container">
        <Link to={isLoggedIn ? "/surveys" : "/"} className="brand-logo">
          Emaily
        </Link>
        <ul className="right">
          {!isLoading &&
            (isNotLoggedIn ? (
              <li>
                <a href="/api/auth/google">Login With Google</a>
              </li>
            ) : (
              <>
                <li key="1">
                  <Payments />
                </li>
                {user && (
                  <li key="2" className="ms-4">
                    Credits: {user.credits}
                  </li>
                )}
                <li key="3">
                  <a href="/api/auth/logout">Logout</a>
                </li>
              </>
            ))}
        </ul>
      </div>
    </nav>
  );
};
