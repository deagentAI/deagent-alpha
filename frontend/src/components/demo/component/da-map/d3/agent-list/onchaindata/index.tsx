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
import { useGetAgentList } from "@/components/demo/hooks";
import style from "./index.module.scss";
import { DaWidgetComponentName } from "@/constants";
import { formatNumberChange } from "@src/utils";

interface Props {}
function createData(
  name: string,
  symbol: number,
  tvl: number,
  referralUrl: string,
  mcap: number,
  chains: []
) {
  return { name, symbol, tvl, referralUrl, mcap, chains };
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
    color: "#CBCACC",
    maxWidth: "100px",
    wordBreak: "break-word",
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
  const { agentList } = useGetAgentList(DaWidgetComponentName.onchaindata);

  const [currentData = {}] = agentList || [{}];

  const data = currentData?.function_respond
    .map((v: any) => {
      return createData(
        v.name,
        v.symbol,
        v.tvl,
        v.referralUrl,
        v.mcap,
        v.chains
      );
    })
    .flat(1);

  return (
    <Typography component={"div"} className={style["app"]}>
      <Typography component={"h3"} className="title">
        #OnchainWatcher - for crypto ecosystem & project info hunting.
        <br />
        #Data source: Defillama
      </Typography>
      <Typography component={"div"} className="app-body">
        <TableContainer component={PagerCustomer}>
          <Table aria-label="onchain table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Projects</StyledTableCell>
                <StyledTableCell align="right">TVL</StyledTableCell>
                <StyledTableCell align="right">Marketcap</StyledTableCell>
                <StyledTableCell align="right">Chains</StyledTableCell>
                <StyledTableCell align="right">URL</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.map((row: any) => (
                <StyledTableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {`${row.name}(${row.symbol})`}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {formatNumberChange(row.tvl)}
                  </StyledTableCell>
                  <StyledTableCell align="right">{formatNumberChange(row.mcap)}</StyledTableCell>
                  <StyledTableCell align="right">{row.chains?.toString()}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Typography component={"a"} href={row.referralUrl} target="_blank" sx={{ color: "#005696", textDecoration: "underline" }}>
                      {`go to ${row.name}`}
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
