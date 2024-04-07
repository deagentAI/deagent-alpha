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
} from "@mui/material";
import { abbreviateAddress } from "@src/utils";
import { DaWidgetComponentName } from "@/constants";
import { message } from "@comp/global";
import { useGetAgentList } from "@/components/demo/hooks";
import { formatNumberChange, forMateTwitterUrl, copyContent } from "@src/utils";
import style from "./index.module.scss";

interface Props {}
function createData(
  symbol: string,
  token_address: number,
  description: number,
  liq: number,
  logo: string,
  holders: string,
  twitter: string
) {
  return {
    symbol,
    token_address,
    description,
    liq,
    logo,
    holders,
    twitter,
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
  const { agentList } = useGetAgentList(DaWidgetComponentName.popularToken);

  const [currentData = {}] = agentList || [{}];

  const data = currentData?.function_respond
    .map((v: any) => {
      return createData(
        v.symbol,
        v.token_address,
        v.description,
        v.liq,
        v.logo,
        v.holders,
        v.twitter
      );
    })
    .flat(1);

  const handleTokenAddress = (row: any) => {
    const { token_address } = row;
    copyContent(token_address);
    message.alert({
      type: "success",
      msg: "copy success",
    });
  };

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
                <StyledTableCell align="left">symbol</StyledTableCell>
                <StyledTableCell align="left">tokenAddress</StyledTableCell>
                <StyledTableCell align="left">description</StyledTableCell>
                <StyledTableCell align="left">holders</StyledTableCell>
                <StyledTableCell align="left">liquidity</StyledTableCell>
                <StyledTableCell align="left">twitter</StyledTableCell>
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
                      <img src={row.logo} width={28} height={28} alt="" />
                      <Typography component={"div"} sx={{ paddingLeft: "5px" }}>
                        {row.symbol}
                      </Typography>
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Typography
                      className="address hover:text-[#004e89]"
                      component={"span"}
                      onClick={() => handleTokenAddress(row)}
                    >
                      {abbreviateAddress(row.token_address, 4)}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.description || "---"}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.holders}</StyledTableCell>
                  <StyledTableCell align="right">
                    {formatNumberChange(row.liq)}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    <Typography
                      component={"a"}
                      href={row.twitter}
                      target="_blank"
                      sx={{ color: "#005696", textDecoration: "underline" }}
                    >
                      @{forMateTwitterUrl(row.twitter).pathName}
                    </Typography>
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
