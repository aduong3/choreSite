import {
  MdOutlineDone,
  MdOutlineFormatListBulleted,
  MdOutlinePercent,
} from "react-icons/md";
import Stat from "../Stat";
import { IoHourglassOutline } from "react-icons/io5";

function ChoreStatList({ amountOfChores, choresDone }) {
  const remainingChores = amountOfChores - choresDone;
  const completedRate = Math.round((choresDone / amountOfChores) * 100);
  return (
    <>
      <Stat
        icon={<MdOutlineFormatListBulleted />}
        title="Total Chores"
        value={amountOfChores}
        color="red"
      />
      <Stat
        icon={<IoHourglassOutline />}
        title="Remaining"
        value={remainingChores}
        color="green"
      />
      <Stat
        icon={<MdOutlineDone />}
        title="Completed"
        value={choresDone}
        color="blue"
      />
      <Stat
        icon={<MdOutlinePercent />}
        title="Completed Rate"
        value={`${isNaN(completedRate) ? 0 : completedRate}%`}
        color="purple"
      />
    </>
  );
}

export default ChoreStatList;
