import { useSelector } from "react-redux";
import { selectUserStatus } from "../redux";
import { Link } from "react-router";

export const Header = () => {
  const { isLoading, isLoggedIn, isNotLoggedIn } =
    useSelector(selectUserStatus);

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={isLoggedIn ? "/surveys" : "/"} className="brand-logo">
          Emaily
        </Link>
        <ul className="right">
          {!isLoading &&
            (isNotLoggedIn ? (
              <li>
                <a href="/auth/google">Login With Google</a>
              </li>
            ) : (
              <li>
                <a href="/api/logout">Logout</a>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
};
