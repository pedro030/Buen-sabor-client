import Sidebar from "../../components/sidebar_employee/Sidebar"
import SearchBar from "../../components/search_bar/SearchBar"
import './categoriescrud.scss'
import CrudHead from "../../components/crud_header/CrudHead"
import CrudCardCategory from "../../components/crud_card_category/CrudCardCategory"
import { useState, useEffect } from "react"

const categories = [
  {
      id: 1,
      name: "Burgers",
      status: true
  },
  {
      id: 2,
      name: "Pizzas",
      status: false
  },
  {
      id: 3,
      name: "Hot Dogs",
      status: true
  },
]

function CategoriesCRUD() {

  const [category, setCategory] = useState(categories)

  useEffect(() => {
    setCategory(categories);
  }, [])

  const deleteCategory = (categoryId: number) => {
    const newCategories = category.filter(cat => cat.id !== categoryId)
    setCategory(newCategories);
  }

  return (
    <div className="container-crud">
        <Sidebar/>
        <div className="container-crud-right">
          <CrudHead/>
          <div className="th-container">
            <span>Category Name</span>
            <span>Status</span>
          </div>
          { category.map(cat => {
            return <CrudCardCategory key={cat.id} category={cat} deleteCategory={deleteCategory}/>
          })}
        </div>
    </div>
  )
}

export default CategoriesCRUD