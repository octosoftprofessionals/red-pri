import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Typeahead } from 'react-bootstrap-typeahead';
import Container from '../Container';
import ImageSelection from '../ImageSelection';
import AddressGroup from './components/AddressGroup';
import PhoneGroup from './components/PhoneGroup';
import { LoadableButton } from '../Loadable';

const EditProfile = (props) => {
  const profile = props.profile || {};
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [name, setName] = useState(profile.name);
  const [surname, setSurname] = useState(profile.surname);
  const [username, setUsername] = useState(profile.username);
  const [matricula, setMatricula] = useState(profile.matricula);
  const [title, setTitle] = useState(profile.title);
  const [about, setAbout] = useState(profile.about);
  const [specialities, setSpecialities] = useState(
    profile.specialities,
  );
  const [themes, setThemes] = useState(profile.themes);
  const [atentionType, setAtentionType] = useState(
    profile.atentionType,
  );
  const [practice, setPractice] = useState(profile.practice);
  const [addressList, setAddressList] = useState(
    profile.addressList || [],
  );
  const [phoneList, setPhoneList] = useState(profile.phoneList || []);

  const {
    specialitiesList,
    themesList,
    atentionTypesList,
    loading,
    onSubmit,
  } = props;

  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      const data = {
        email,
        name,
        surname,
        username,
        matricula,
        title,
        about,
        specialities: specialities.map((item) =>
          item.customOption ? item.label : item,
        ),
        themes: themes.map((item) =>
          item.customOption ? item.label : item,
        ),
        atentionType: atentionType.map((item) =>
          item.customOption ? item.label : item,
        ),
        practice,
        addressList,
        phoneList,
      };
      if (password.length > 0) data['password'] = password;
      onSubmit({
        ...data,
        file,
      });
    }
    setValidated(true);
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Row className="d-flex align-items-end">
              <Form.Group as={Col} md="4" controlId="formGridImage">
                <ImageSelection
                  src={fileURL || profile.picUrl}
                  defaultImage="/imgs/userDefault.svg"
                  onChange={(event) => {
                    setFile(event.target.files[0]);
                    setFileURL(
                      URL.createObjectURL(event.target.files[0]),
                    );
                  }}
                />
              </Form.Group>
              <Col md="8">
                <Form.Row>
                  <Col md="12">
                    <h2>{props.buttonName} perfil</h2>
                    {props.message ? <h4>{props.message}</h4> : ''}
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} sd="6" controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Nombre"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} sd="6" controlId="apellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Apellido"
                      value={surname}
                      onChange={(event) => {
                        setSurname(event.target.value);
                      }}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} sd="6" controlId="titulo">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Titulo"
                      value={title}
                      onChange={(event) => {
                        setTitle(event.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} sd="6" controlId="matricula">
                    <Form.Label>Matricula</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Matricula"
                      value={matricula}
                      onChange={(event) => {
                        setMatricula(event.target.value);
                      }}
                    />
                  </Form.Group>
                </Form.Row>
              </Col>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="4" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Ingrese email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese un email valido.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="password">
                <Form.Label>Contrase??a</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="username">
                <Form.Label>Nombre de usuario</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">
                      @
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="usuario"
                    aria-describedby="inputGroupPrepend"
                    required
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingrese un nombre de usuario.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="acerca">
                <Form.Label>Acerca de m??</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  value={about}
                  onChange={(event) => {
                    setAbout(event.target.value);
                  }}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="4" controlId="especialidades">
                <Form.Label>Especialidades</Form.Label>
                <Typeahead
                  allowNew
                  onChange={setSpecialities}
                  options={specialitiesList}
                  placeholder="Especialidades..."
                  selected={specialities}
                  newSelectionPrefix="Otra: "
                  multiple
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="temas">
                <Form.Label>Temas</Form.Label>
                <Typeahead
                  allowNew
                  onChange={setThemes}
                  options={themesList}
                  placeholder="Temas..."
                  selected={themes}
                  newSelectionPrefix="Otro: "
                  multiple
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="orientaciones">
                <Form.Label>Tipo de atenci??n</Form.Label>
                <Typeahead
                  allowNew
                  onChange={setAtentionType}
                  options={atentionTypesList}
                  placeholder="Tipos de atenci??n..."
                  selected={atentionType}
                  newSelectionPrefix="Otro: "
                  multiple
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="practica">
                <Form.Label>Acerca de la pr??ctica</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  value={practice}
                  onChange={(event) => {
                    setPractice(event.target.value);
                  }}
                />
              </Form.Group>
            </Form.Row>

            <AddressGroup
              addressList={addressList}
              onChange={setAddressList}
            />
            <PhoneGroup
              phoneList={phoneList}
              onChange={setPhoneList}
            />
            <div className="text-right">
              <LoadableButton
                loading={loading}
                disabled={loading}
                type="submit"
                size="lg"
              >
                {props.buttonName}
              </LoadableButton>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditProfile;
