import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// import useApi from 'components/utils/useApi';
import UIButton from 'components/UI/Button/Button';
import AddressList from '../List/List';
import './Search.css';

const AddressSearch = () => {
  const [atributte, setAtributte] = useState('default');
  const [address, setAddress] = useState([]);
  const [search, setSearch] = useState('');

  // fazer um service para api
  // const [load, loadInfo] = useApi({
  //   url: 'http://localhost:5000/address',
  //   method: 'get',
  //   params: {
  //     `${atributte}_like`: search || undefined,
  //   },

  //   onCompleted: (response) => {
  //     setAddress(response.data)
  //   }
  // })

    

  useEffect(() => {
    const params = {};
    // if (search) {
    //   const query = `${atributte}_like`
    //   params[query] = search;
    // }

    if (search) {
      switch (atributte) {
        case 'cep':
          params.cep_like = search
          break;
        case 'rua':
          params.rua_like = search;
          break;
        case 'numero':
          params.numero_like = search;
          break;  
        case 'bairro':
          params.bairro_like = search;
          break;
        case 'cidade':
          params.cidade_like = search;
          break;
        case 'estado':
            params.estado_like = search;
            break;
        default:
          params.nome_like = search;
      }
    }
    axios.get('http://localhost:5000/address', {params})
    .then((response) => {
      setAddress(response.data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  async function load(){
    const response = await axios.get('http://localhost:5000/address')

    setAddress(response.data);
  }

  function onChange(ev) {
    const value = ev.target.value;

    console.log(value);

    setAtributte(value);
  }

  return (
    <div className='address-search'>
      <header className='address-search__header'>
        <h1>Endereços</h1>
        <UIButton component={Link} to={`/create`} theme='contained'>Novo endereço</UIButton>
      </header>

      <div className='address-search__atributtes'>
        <input 
          className='address-search__input' 
          type='search' 
          placeholder="Buscar"
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
        />

        <select value={atributte} className='address-search__select' onChange={onChange}>
          <option value='default'>Selecione...</option>
          <option value='nome'>Nome</option>
          <option value='cep'>CEP</option>
          <option value='rua'>Rua</option>
          <option value='bairro'>Bairro</option>
          <option value='numero'>Número</option>
          <option value='cidade'>Cidade</option>
          <option value='estado'>Estado</option>
        </select>
      </div>

      <AddressList 
        address={address} 
        loading={!address.length} 
        refetch={() => load()}
      />

    </div>
  )
}

export default AddressSearch;