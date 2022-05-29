
const Category = ({handleCategoryChange, selected }) => {
	
	const handleDropDown = (event) => {
		handleCategoryChange(event.target.value);
	};
	return (
		<div className="cat-Filter">
			<div className="cat-heading">
				<label>Filter by Category</label>{" "}
				<select value={selected} onChange={handleDropDown}>
					<option value="All">All</option>
					<option value="Parks">Parks</option>
					<option value="Sightseeing">Sightseeing</option>
				</select>
			</div>
		</div>
	);
};

export default Category;