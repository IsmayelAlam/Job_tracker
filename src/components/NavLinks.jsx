import { NavLink } from "react-router-dom";
import links from "../utils/links";
import { useDashboardContext } from "../page/DashboardLayout";

export default function NavLinks({ isBigSidebar }) {
  const { toggleSidebar } = useDashboardContext();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;

        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}
