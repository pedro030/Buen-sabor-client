import SearchBar from "../search_bar/SearchBar"
import { IoIosAddCircleOutline } from 'react-icons/io'
import { CiFilter } from 'react-icons/ci'
import './crudhead.scss'

function CrudHead() {
  return (
    <div className="crud-container-head">
        <div className="crud-name">Category</div>
        <div className="search-bar"><SearchBar/></div>
        <div className="btn-container">
            <button className="btn-filter"><CiFilter className="icon-filter" />Filter</button>
            <button className="btn-add"><IoIosAddCircleOutline className="icon-add" />Add Category</button>
        </div>
    </div>
  )
}

export default CrudHead