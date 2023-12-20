const Filter = ({newfilter, handleFilterChange}) => (
    <div>
          filter: <input 
          value={newfilter}
          onChange={handleFilterChange}
          />
        </div>
)

export default Filter