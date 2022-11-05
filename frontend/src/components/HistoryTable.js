import * as React from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { PropTypes } from "prop-types";

import "./style.scss";
import { NavLink } from "react-router-dom";

const createData = (entry) => {
	const { createdAt, difficulty, qids } = entry;
	const date = new Date(Date.parse(createdAt));
	const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
	return { createdAt: formattedDate, qids, difficulty };
};

const formatQns = (qids) => {
	return qids.map((qid) => <NavLink className="nav-link" key={`qn-${qid}`} to={`/questions/${qid}`}>{qid}</NavLink>);
};

export const HistoryTable = ({ history }) => {
	return (
		<TableContainer sx={{ my: 5 }} component={Paper}>
			<Table sx={{ minWidth: 400 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Date & Time</TableCell>
						<TableCell>Question(s)</TableCell>
						<TableCell>Difficulty</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{history.map((entry) => {
						const row = createData(entry);
						console.log(row.qids);
						return (
							<TableRow
								key={row.name}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{row.createdAt}
								</TableCell>
								<TableCell sx={{ maxWidth: "50%", flexWrap: "wrap" }}>{formatQns(row.qids)}</TableCell>
								<TableCell align="right"><p className={`difficulty-cell ${row.difficulty}`}>{row.difficulty}</p></TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

HistoryTable.propTypes = {
	history: PropTypes.array,
};


export default HistoryTable;