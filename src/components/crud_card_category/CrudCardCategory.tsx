import './crudcardcategory.scss'
import { FiEdit2 } from 'react-icons/fi'
import { TbLockOpen, TbLock } from 'react-icons/tb'
import { RiDeleteBin6Line } from 'react-icons/ri'

function CrudCardCategory({category, deleteCategory} : any) {

  return (
    <div className='card-container-crud'>
        <div className='card-container-info'>
            <span className='card-name'>{category.name}</span>
            {category.status ? <span className='card-status-active'>Active</span> : <span className='card-status-inactive'>Inactive</span>}
        </div>
        <div className='card-crud-opc'>
            <FiEdit2 className='edit-icon'/>
            {category.status ? <TbLockOpen className='status-iconUnlck'/> : <TbLock className='status-iconLock'/>}
            <RiDeleteBin6Line className='delete-icon' onClick={() => deleteCategory(category.id)}/>
        </div>
    </div>
  )
}

export default CrudCardCategory