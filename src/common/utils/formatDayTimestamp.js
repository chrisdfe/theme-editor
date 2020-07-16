import { format } from "date-fns";

const formatDayTimestamp = (date) => format(date, "MM-dd-yyyy");

export default formatDayTimestamp;
