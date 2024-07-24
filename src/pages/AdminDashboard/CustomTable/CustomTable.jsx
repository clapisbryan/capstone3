import React from 'react'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import UpdateProduct from '../../../components/AdminView/UpdateProduct';
import DisableProduct from '../../../components/AdminView/DisableProduct';

const CustomTable = ({ items, fetchData }) => {

	const fields = [
		{ key: 'name', label: 'Name' },
		{ key: 'description', label: 'Description' },
		{ key: 'price', label: 'Price' },
		{ key: 'availability', label: 'Availability' },
		{ key: 'actions', label: 'Actions' },
		]

	return (
		<>
		<div>
		<Table striped bordered>
		<thead>
		<tr>
		{fields.map((field) => {
			return (
				<th key={field.key}>{field.label}</th>
				)
		})}

		</tr>
		</thead>
		<tbody>
		{items.map((item) => {
			return (
				<tr key={item.id}>
				<td>{item.name}</td>
				<td>{item.description}</td>
				<td>{item.price}</td>
				<td className={item.isActive ? "text-success" : "text-danger"}>
					{item.isActive ? "Available" : "Unavailable"}
				</td>
			
			{/* Action button here*/}
			<td className="text-center">
			<UpdateProduct item={item._id} fetchData={fetchData} />
			<DisableProduct item={item._id} isActive={item.isActive} fetchData={fetchData} />
			</td>
			</tr> 
			)
		})}
		</tbody>
		</Table>
		</div>
		</>
		)
}

export default CustomTable
