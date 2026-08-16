import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { FC } from "react";

type Props = {
  datetime: string;
};

dayjs.extend(utc);
dayjs.extend(timezone);

export const DateTime: FC<Props> = ({ datetime }) => {
  const formatDate = dayjs
    .utc(datetime)
    .tz("Asia/Tokyo")
    .format("YYYY.MM.DD (ddd)");
  return <time dateTime={formatDate}>{formatDate}</time>;
};
