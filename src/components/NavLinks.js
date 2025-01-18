import { NavLink } from "react-router-dom";
function NavLinks() {
  return (
    <nav className="flex items-center gap-[0.3rem] justify-evenly md:justify-center md:gap-[6rem]">
      <CustomNavLink to="/">Home</CustomNavLink>
      <CustomNavLink to="/movies">Movies</CustomNavLink>
      <CustomNavLink to="/series">Series</CustomNavLink>
      <CustomNavLink to="/bookmarks">Bookmarks</CustomNavLink>
    </nav>
  );
}

function CustomNavLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-2 rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-dark-purple text-white dark:bg-light-purple dark:text-dark-bg"
            : "text-gray-purple hover:text-hover-dark-purple hover:bg-dark-purple/10 dark:text-nav-dark dark:hover:text-white dark:hover:bg-light-purple/30"
        }`
      }
    >
      {children}
    </NavLink>
  );
}
export default NavLinks;
