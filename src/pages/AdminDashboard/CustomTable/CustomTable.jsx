import React from 'react'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const CustomTable = ({ items }) => {

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
									{item.isActive ?
										<td>Available</td> :
										<td>Unavailable</td>
									}

									{/* Action button here*/}
									<td>
										<Button variant='primary' className='mx-1' size='sm'>Update</Button>
										<Button variant='danger' className='mx-1' size='sm'>Activate</Button>
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
