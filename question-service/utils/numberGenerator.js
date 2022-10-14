export const numberGenerator = async (list, numQuestions) => {
	let rand = 0;
	while (rand === 0 || list.includes(rand)) {
		rand = Math.ceil(Math.random() * numQuestions);
	}
	return rand;
};