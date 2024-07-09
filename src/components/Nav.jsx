import { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const links = ["analytics", "plots", "dashboard"];

  const [activeLink, setActiveLink] = useState(links[0]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav
      className='flex items-center justify-between p-4 border-b border-black-300 bg-gradient-to-r from-amber-100
    via-teal-400 to-blue-400'
    >
      {/* <nav
      className='flex items-center justify-between p-2 border-b border-black-300 bg-gradient-to-r from-amber-100
     via-teal-400 to-blue-400'
    > */}
      <div className='flex items-center'>
        <div className='rounded-full mr-2'>
          <img
            // src='https://imgs.search.brave.com/Btz7GGgl11Em5jT-HM4PsEB9YYbgLnWhazq7k-Z3J98/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jb21w/YW5pZXNsb2dvLmNv/bS9pbWcvb3JpZy9E/Q01TSFJJUkFNLk5T/LThmYTljMWRmLnBu/Zz90PTE2MDQwNjcw/MzI'
            // src='https://companieslogo.com/img/orig/DCMSHRIRAM.NS-8fa9c1df.png?t=1604067032'
            src='https://play-lh.googleusercontent.com/lFGdL8tanKdKXSFdp8qf_IW9m98Sgr6cI9WcmeS09xQG_miVYNQbbzYRf0CS8ZkhQ54=w240-h480-rw'
            alt='Logo'
            className='h-24 w-24'
          />
        </div>
        <span className='text-lg font-bold'>DCM Shriram</span>
      </div>
      <div className='flex space-x-4 mr-6'>
        <Link
          to=''
          onClick={() => handleLinkClick("analytics")}
          className={`text-gray-700 hover:text-gray-900 ${
            activeLink === "analytics"
              ? "border-b-2 border-teal-900 text-gray-800"
              : ""
          }`}
        >
          Analytics
        </Link>
        <Link
          to='/plots'
          onClick={() => handleLinkClick("plots")}
          className={`text-gray-700 hover:text-gray-900 ${
            activeLink === "plots"
              ? "border-b-2 border-teal-900 text-gray-800"
              : ""
          }`}
        >
          Plots
        </Link>
        <Link
          to='/dashboard'
          onClick={() => handleLinkClick("dashboards")}
          className={`text-gray-700 hover:text-gray-900 ${
            activeLink === "dashboards"
              ? "border-b-2 border-teal-900 text-gray-800"
              : ""
          }`}
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
