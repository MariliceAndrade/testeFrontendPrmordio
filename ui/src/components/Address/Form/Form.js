import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import UIButton from 'components/UI/Button/Button';
import './Form.css';

const initialValue = {
  cep: '',
  rua: '',
  numero: '',
  bairro: '',
  cidade: '',
  estado: '',
  complemento: '',
  ponto_referencia: '',
}

const AddressForm = ({ id }) => {
  const [values, setValues] = useState(id ? null : initialValue)
  const history = useHistory();

  async function onBlurCep(ev) {
    const { value } = ev.target;
    
    const cep = value?.replace(/[^0-9]/g, '');

    // if (cep?.lenght !== 8) {
    //   return ;
    // }

    const response = await axios.get(`https://viacep.com.br/ws/${value}/json`);
    const { data } = response;
    console.log(data.logradouro);
    setValues({...values, 'rua': data.logradouro});
    console.log(values.rua);
    setValues({...values, 'bairro': data.bairro});
    setValues({...values, 'cidade': data.localidade});
    setValues({...values, 'estado': data.uf});
    console.log(values.estado);




    // console.log(values);

    // fetch(`https://viacep.com.br/ws/${cep}/json`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setValues({...values, 'rua': data.logradouro});
    //     setValues({...values, 'bairro': data.bairro});
    //     setValues({...values, 'cidade': data.localidade});
    //     setValues({...values, 'estado': data.uf});

    //   })

    // console.log(values);
    // const response = await axios.get(`https://viacep.com.br/ws/${value}/json`);
    // console.log(response.data);
  }

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/address/${id}`)
        .then((response) => {
          console.log(response);
          setValues(response.data)
        })
    }
  }, [id]);

  function onSubmit(ev) {
    ev.preventDefault();

    const method = id ? 'put' : 'post';
    const url = id 
      ? `http://localhost:5000/address/${id}`
      : 'http://localhost:5000/address'
    
    axios[method](url, values)
      .then((response) => {
        history.push('/');
      });

    // console.log(values);
  }

  function onChange(ev) {
    const { name, value } = ev.target;

    setValues({...values, [name]: value});
  }

  return (
    <div>
      <h1>{id ? 'Editar endereço' : 'Novo endereço'}</h1>

      {!values 
        ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={onSubmit}>
            <div className='address-form__group'>
              <label htmlFor='nome'>Nome</label>
              <input id='nome' name='nome' value={values.nome} onChange={onChange}/>
              <label htmlFor='cep'>CEP</label>
              <input id='cep' onBlur={onBlurCep} name='cep' value={values.cep} onChange={onChange}/>
              <label htmlFor='rua'>Rua</label>
              <input id='rua' name='rua' value={values.rua} onChange={onChange} />
              <label htmlFor='numero'>Número</label>
              <input id='numero' name='numero' value={values.numero} onChange={onChange} />                  
              <label htmlFor='bairro'>Bairro</label>
              <input id='bairro' name='bairro' value={values.bairro} onChange={onChange} />
              <label htmlFor='cidade'>Cidade</label>
              <input id='cidade' name='cidade' value={values.cidade} onChange={onChange} />
              <label htmlFor='estado'>Estado</label>
              <input id='estado' name='estado' value={values.estado} onChange={onChange} />
              <label htmlFor='complemento'>Complemento</label>
              <input id='complemento' name='complemento' value={values.complemento} onChange={onChange} />
              <label htmlFor='pont_referencia'>Ponto de referência</label>
              <input id='ponto_referencia' name='ponto_referencia' value={values.ponto_referencia} onChange={onChange} />
              <div>
                <UIButton type='submit' theme='contained'>Salvar</UIButton>
              </div>
            </div>
          </form>
        )}
    </div>
  )
}

export default AddressForm;