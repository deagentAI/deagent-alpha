/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import { Typography } from "@mui/material";
interface Props {
  value: any;
}

const ReminderComp: React.FC<Props> = (props) => {
  const { value } = props;
  return (
    <Typography component={"div"}>
      <Typography>our request has been successfully confirmed!</Typography>
      <Typography>Details are as follows: </Typography>
      <Typography>Twitter account: @{value.reminder.tracking}</Typography>
      <Typography>Receiving Channel:{value.reminder.email}</Typography>
      <Typography>Keywords: {value.reminder.keyword}</Typography>
      <Typography sx={{ paddingTop: "20px" }}>
        {`Rest assured, we will promptly send a notification to your
                      specified email address when the condition you've set
                      based on the keyword "to the moon" is triggered on the
                      @dogecoin Twitter account. Stay tuned as you won't miss
                      out on any important updates!`}
      </Typography>
    </Typography>
  );
};

export default memo(ReminderComp);
