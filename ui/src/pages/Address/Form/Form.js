import React from 'react';
import { useParams } from 'react-router-dom';

import AddressForm from 'components/Address/Form/Form';
import Container from 'components/UI/Container/Container';

const PagesAddressForm = () => {
  const { id } = useParams();

  return (
    <div>
      <Container>
        <AddressForm id={id ? Number.parseInt(id, 10) : null } />
      </Container>
    </div>
  )
}

export default PagesAddressForm;