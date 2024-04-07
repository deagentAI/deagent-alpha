/**
 * @description trending cex agent
 * @author maicFir
 */
import React, { memo } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  styled,
  tableCellClasses,
  Tooltip,
} from "@mui/material";

import { DaWidgetComponentName } from "@/constants";
import { PrecentUpDown } from "@comp/global";
import { useGetAgentList } from "@/components/demo/hooks";

import style from "./index.module.scss";

interface Props {}
function createData(
  icon: string,
  symbol: string,
  price: string,
  price_change_percent: number,
  tag: string,
  content: string
) {
  return {
    icon,
    symbol,
    price,
    price_change_percent,
    tag,
    content,
  };
}

const PagerCustomer = styled(Paper)({
  width: "100%",
  backgroundColor: "#000",
  color: "#fff",
});
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#fff",
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const Index: React.FC<Props> = (props) => {
  const {} = props;
  const { agentList } = useGetAgentList(DaWidgetComponentName.trendingCex);

  const [currentData = {}] = agentList;

  const data = currentData?.function_respond
    .map((v: any) => {
      return createData(
        v.icon,
        v.symbol,
        v.price,
        v.price_change_percent,
        v.tag,
        v.content
      );
    })
    .flat(1);

  return (
    <Typography component={"div"} className={style["app"]}>
      <Typography
        component={"div"}
        className="app-body"
        sx={{ width: "480px" }}
      >
        <TableContainer component={PagerCustomer}>
          <Table aria-label="onchain table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="left">Symbol</StyledTableCell>
                <StyledTableCell align="left">Price</StyledTableCell>
                <StyledTableCell align="left">Tag</StyledTableCell>
                <StyledTableCell align="left">News</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data?.map((row: any) => (
                <StyledTableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    <Typography component={"div"} display={"flex"}>
                      <img src={row.icon} width={28} height={28} alt="" />
                      <Typography component={"div"} sx={{ paddingLeft: "5px" }}>
                        {row.symbol}
                      </Typography>
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Typography component={"span"}>
                      {row.price}
                      <PrecentUpDown value={row.price_change_percent}>
                        %
                      </PrecentUpDown>
                    </Typography>
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    {row.tag.toString()}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Tooltip
                      title={
                        <div
                          dangerouslySetInnerHTML={{ __html: row.content }}
                        ></div>
                      }
                    >
                      <span className="text-ellipsis whitespace-nowrap">
                        {" "}
                        {row.content.slice(0, 10)}
                      </span>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Typography>
    </Typography>
  );
};

export default memo(Index);
