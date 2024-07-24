import React, { useContext } from 'react'
import AddNewProduct from './AddNewProduct/AddNewProduct'
import UserContext from '../../../hooks/UserContext';

const Action = ({ fetchData }) => {
	
  const { user, setUser } = useContext(UserContext);
console.log("add New Action", user);
	return (
		<div>
			<div className="d-flex align-items-center justify-content-center">
				<AddNewProduct fetchData={fetchData} />
			</div>
		</div>
	)
}

export default Action
