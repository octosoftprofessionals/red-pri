import React, { useState } from 'react';
import Router from 'next/router';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Geocode from 'react-geocode';
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';
import { googleMapsAPIKey } from '../../config';
import { extractType } from '../../utils/geocoding';
import { LoadableButton as Button } from '../Loadable';

Geocode.setApiKey(googleMapsAPIKey);
Geocode.setLanguage('es');
Geocode.setRegion('ar');

const SearchByLocation = ({ titlesList }) => {
  const [title, setTitle] = useState([]);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const slug =
      '/busqueda/profesion-' +
      title.join().toLowerCase().replace(/ /g, '-') +
      '/coordenadas-@' +
      address.location.lat +
      ',' +
      address.location.lng;

    Router.push(slug);
  }

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = (street) => {
    setIsLoading(true);

    Geocode.fromAddress(street).then(
      (response) => {
        const newOptions = response.results.map((i) => ({
          street: i.formatted_address,
          location: i.geometry.location,
          province: extractType(
            'administrative_area_level_1',
            i.address_components,
          ),
          locality:
            extractType('locality', i.address_components) ||
            extractType('sublocality', i.address_components),
          zipCode: extractType('postal_code', i.address_components),
        }));
        if (newOptions.length > 0) {
          setOptions(newOptions);
        }
        setIsLoading(false);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} sm={4} controlId="especialidad">
          <Form.Label>Profesi??n(*)</Form.Label>
          <Typeahead
            onChange={setTitle}
            options={titlesList}
            placeholder="Profesi??n..."
            selected={title}
          />
        </Form.Group>

        <Form.Group as={Col} sm={8} controlId="direccion">
          <Form.Label>Direcci??n</Form.Label>
          <AsyncTypeahead
            id="direccion"
            isLoading={isLoading}
            labelKey="street"
            minLength={5}
            onSearch={handleSearch}
            filterBy={() => true}
            onChange={(selection) => {
              setAddress(selection[0]);
            }}
            options={options}
            placeholder="Calle 1234"
          />
          <Form.Text className="text-muted">
            Ingresa una direcci??n o usa tu ubicaci??n actual. Ej.: Av.
            Corrientes 1300, Ciudad Aut??noma de Buenos Aires
          </Form.Text>
        </Form.Group>
      </Form.Row>

      <Col xs="auto" className="my-1 d-flex justify-content-end">
        <Button
          variant="primary"
          className="btn-lg"
          type="submit"
          loading={loading}
          disabled={title.length === 0 || address === null || loading}
        >
          Buscar
        </Button>
      </Col>
    </Form>
  );
};

export default SearchByLocation;
