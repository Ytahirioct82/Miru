const Category = ({ handleCategoryChange, selected }) => {
  const handleDropDown = (event) => {
    handleCategoryChange(event);
  };
  return (
    <div className="cat-Filter">
      <div className="cat-heading">
        <select value={selected} onChange={handleDropDown}>
          <option value="All">Categories</option>
          <option value="Parks">Parks</option>
          <option value="Sightseeing">Sightseeing</option>
          <option value="Art">Art</option>
          <option value="Architecture">Architecture</option>
        </select>
      </div>
    </div>
  );
};

export default Category;
