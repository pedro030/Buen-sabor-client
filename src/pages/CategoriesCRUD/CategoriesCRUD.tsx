import Sidebar from "../../components/sidebar_employee/Sidebar"
import SearchBar from "../../components/search_bar/SearchBar"
import './categoriescrud.scss'
import CrudHead from "../../components/crud_header/CrudHead"

function CategoriesCRUD() {
  return (
    <div className="container-crud">
        <Sidebar/>
        <CrudHead/>
    </div>
  )
}

export default CategoriesCRUD