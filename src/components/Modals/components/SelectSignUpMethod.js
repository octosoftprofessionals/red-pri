import React from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import FAIcon from '../../FAIcon';

const SelectSignUpMethod = (props) => (
  <>
    <Modal.Header closeButton>
      <Modal.Title>Registrarse a Red-Pri</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Container className="text-center d-flex flex-column align-items-center">
        <p>
          Creá una cuenta para ver contenido adicional, configurar
          alertas y seguir autores de tu interés.
        </p>
        <Col xs className="d-flex flex-column p-3 col-sm-8">
          {/* <Button variant="outline-primary" className="m-2 pl-sm-5 text-left">
          <FAIcon className="fa fa-google" />{' '}Registrarse con Google
        </Button>
        <Button variant="outline-info" className="m-2 pl-sm-5 text-left">
          <FAIcon className="fa fa-facebook-official" />{' '}Registrarse con Facebook
        </Button> */}
          <Button
            variant="outline-secondary"
            className="m-2 pl-sm-5 text-left"
            onClick={props.onEmailMethod}
          >
            <FAIcon className="fa fa-envelope-o" /> Registrarse con
            email
          </Button>
        </Col>

        <p>
          ¿Ya tenes una cuenta?{' '}
          <a href="#" onClick={props.onSelectSignIn}>
            Ingresá
          </a>
        </p>
        <p>
          Para hacer funcionar Red-Pri, guardamos información del
          usuario. Al hacer click en “Registrarse” aceptas los{' '}
          <Link href="/">
            <a>terminos y condiciones</a>
          </Link>
        </p>
      </Container>
    </Modal.Body>
  </>
);

export default SelectSignUpMethod;
