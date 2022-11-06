import * as React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { PropTypes } from "prop-types";
import "./style.scss";
import { NavLink } from "react-router-dom";

const columns = [
	{ field: "id", headerName: "ID", width: 100, renderCell: (params) => <NavLink className="nav-link" to={`/questions/${params.value}`}>{params.value}</NavLink> },
	{ field: "title", headerName: "Title", width: 500, sortComparator: (d1, d2) => d1.title.localeCompare(d2.title), renderCell: (params) => <NavLink className="nav-link" to={`/questions/${params.value.id}`}>{params.value.title}</NavLink> },
	{ field: "difficulty", headerName: "Difficulty", width: 130, renderCell: (params) => <p className={`difficulty-cell ${params.value}`}>{params.value}</p> },
];

const generateRows = (questions) => {
	return questions.map((q) => {
		return {
			id: q.questionId,
			title: { title: q.title, id: q.questionId },
			difficulty: q.difficulty,
		};
	});
};

const QuestionsTable = ({ questions }) => {
	return (
		<div style={{ height: 800, width: 800 }}>
			<DataGrid
				rows={generateRows(questions)}
				columns={columns}
				pageSize={50}
				disableSelectionOnClick
				rowsPerPageOptions={[ 50 ]}
			/>
		</div>
	);
};

QuestionsTable.propTypes = {
	questions: PropTypes.array,
};

export default QuestionsTable;

