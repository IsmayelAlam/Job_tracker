import {
  Outlet,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import styled from "styled-components";
import { createContext, useContext, useState } from "react";

import { BigSidebar, Loading, Navbar, SmallSidebar } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const DashboardContext = createContext();

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

export default function DashboardLayout() {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDark, setIsDark] = useState(checkDefaultTheme());

  const isPageLoading = navigation.state === "loading";

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const toggleDarkTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle("dark-theme", !isDark);
    localStorage.setItem("darkTheme", !isDark);
  };
  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logging out...");
  };

  return (
    <DashboardContext.Provider
      value={{
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
        user,
        showSidebar,
        isDark,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
}

export const useDashboardContext = () => useContext(DashboardContext);

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`;
