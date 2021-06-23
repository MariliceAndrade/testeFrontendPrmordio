import React from 'react';

import AddressCard from '../Card/Card';
import './List.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddressList = ({ loading, address, refetch }) => {
  const history = useHistory();

  if (loading){
    return <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>Carregando...</div>
  }

  async function onDelete(id){
    // ev.preventDefault();

    console.log('delete ' + id);
    await axios.delete(`http://localhost:5000/address/${id}`);

    history.push('/');
  }

  return (
    <div className='address-list'>
      {address.map((address) => (
        <AddressCard 
          address={address} 
          key={address.id} 
          onClickDelete={async () => {
            await onDelete(address.id)
            refetch();
          }}
          />  
      ))}
    </div>
  )
}

export default AddressList;