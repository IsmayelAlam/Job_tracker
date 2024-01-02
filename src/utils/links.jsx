import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  {
    text: "all jobs",
    path: ".",
    icon: <MdQueryStats />,
  },
  {
    text: "add job",
    path: "add-jobs",
    icon: <FaWpforms />,
  },
  {
    text: "stats",
    path: "stats",
    icon: <IoBarChartSharp />,
  },
  {
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
];

export default links;
