import React from 'react';
import { Link } from 'react-router-dom';

import UIButton from 'components/UI/Button/Button';
import './Card.css';

const AddressCard = ({ address, onClickDelete }) => {


  return (
    <div className="address-card">
      <h1 className="address-card__nome">{address.nome}</h1>
      <h3 className="address-card__endereco">{address.rua}, n. {address.numero}, {address.cep}</h3>
      <span className="address-card_info">Bairro: {address.bairro}, {address.cidade} - {address.estado}</span>
      {address.complemento && (<span className="address-card_info">Complemento: {address.complemento}</span>)}
      {address.ponto_referencia && (<span className="address-card_info">Ponto de referência: {address.ponto_referencia}</span>)}
      <div className='button-group'>
        <UIButton component={Link} to={`/edit/${address.id}`}>Editar</UIButton>
        <UIButton component={Link} to={`/`} onClick={onClickDelete}>Excluir</UIButton>
      </div>
    </div>
  )
}

export default AddressCard;