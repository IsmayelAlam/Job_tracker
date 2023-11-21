import { Outlet, redirect, useLoaderData } from "react-router-dom";
import styled from "styled-components";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import { createContext, useContext, useState } from "react";
import customFetch from "../utils/customFetch";

const DashboardContext = createContext();

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

export const loader = async () => {
  try {
    const { data } = await customFetch("/user/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

export default function DashboardLayout() {
  const user = useLoaderData();
  console.log(user);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDark, setIsDark] = useState(checkDefaultTheme());

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const toggleDarkTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle("dark-theme", !isDark);
    localStorage.setItem("darkTheme", !isDark);
  };
  const logoutUser = async () => console.log("logout User");

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
              <Outlet />
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
