import { Route, Routes } from "react-router";
import { Header } from "./Header";
import { useEffect } from "react";
import { fetchCurrentUser, useAppDispatch } from "../redux";
import { Landing } from "./Landing";

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route index element={<Landing />} />
          <Route path="surveys" element={<Dashboard />} />
          <Route path="surveys/new" element={<SurveyNew />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </div>
    </div>
  );
};
