import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


import { Text, Box } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
    datetime: string;
}

export const DateTime: FC<Props> = ({ datetime }) => {
    dayjs.extend(utc)
    dayjs.extend(timezone);
    const formatDate = dayjs.utc(datetime).tz('Asia/Tokyo').format('YYYY.MM.DD (ddd)')
    return (
        <Text as="time" dateTime={formatDate}>
            {formatDate}
        </Text>
    );
};