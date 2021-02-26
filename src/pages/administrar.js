import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';

import Container from '../components/Container';
import UsersTable from '../components/Admin/UsersTable/index';
import ArticlesTable from '../components/Admin/ArticlesTable/index';
import EventsTable from '../components/Admin/EventsTable/index';
import SlidesTable from '../components/Admin/SlidesTable/index';
import MessagesTable from '../components/Admin/MessagesTable/index';
import InscriptionTable from '../components/Admin/InscriptionTable/index';

const Admin = () => {
  const [selected, setSelected] = useState('users');
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [events, setEvents] = useState([]);
  const [slides, setSlides] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inscriptions, setInscriptions] = useState([]);

  useEffect(() => {
    upDateTableUsers();
    upDateTableArticles();
    upDateTableEvents();
    upDateTableSlides();
    upDateTableMessages();
    upDateTableInscriptions();
  }, []);

  const upDateTableUsers = async () => {
    const resUsers = await fetch(`/api/admin/users`);
    setUsers(await resUsers.json());
  };
  const upDateTableArticles = async () => {
    const resArticles = await fetch(`/api/admin/articles`);
    setArticles(await resArticles.json());
  };
  const upDateTableEvents = async () => {
    const resEvents = await fetch(`/api/admin/events`);
    setEvents(await resEvents.json());
  };
  const upDateTableSlides = async () => {
    const resSlides = await fetch(`/api/slides`);
    setSlides(await resSlides.json());
  };
  const upDateTableMessages = async () => {
    const resMessages = await fetch(`/api/messages`);
    setMessages(await resMessages.json());
  };
  const upDateTableInscriptions = async () => {
    const resInscriptions = await fetch(`/api/inscriptions`);
    setInscriptions(await resInscriptions.json());
  };

  return (
    <Container>
      <Nav
        defaultActiveKey={selected}
        variant="pills"
        className="p-2"
      >
        <Nav.Link
          eventKey="users"
          onClick={() => setSelected('users')}
        >
          Usuarios
        </Nav.Link>
        <Nav.Link
          eventKey="articles"
          onClick={() => setSelected('articles')}
        >
          Articulos
        </Nav.Link>
        <Nav.Link
          eventKey="events"
          onClick={() => setSelected('events')}
        >
          Events
        </Nav.Link>
        <Nav.Link
          eventKey="inscriptions"
          onClick={() => setSelected('inscriptions')}
        >
          Inscripciones
        </Nav.Link>
        <Nav.Link
          eventKey="slides"
          onClick={() => setSelected('slides')}
        >
          Portada
        </Nav.Link>
        <Nav.Link
          eventKey="messages"
          onClick={() => setSelected('messages')}
        >
          Mensajes
        </Nav.Link>
      </Nav>

      <Card>
        {selected === 'users' ? (
          <UsersTable
            users={users}
            upDateTable={() => upDateTableUsers()}
          />
        ) : selected === 'articles' ? (
          <ArticlesTable
            articles={articles}
            upDateTable={() => upDateTableArticles()}
          />
        ) : selected === 'events' ? (
          <EventsTable
            events={events}
            upDateTable={() => upDateTableEvents()}
          />
        ) : selected === 'slides' ? (
          <SlidesTable
            slides={slides}
            upDateTable={() => upDateTableSlides()}
          />
        ) : selected === 'messages' ? (
          <MessagesTable
            messages={messages}
            upDateTable={() => upDateTableMessages()}
          />
        ) : (
          <InscriptionTable
            inscriptions={inscriptions}
            upDateTable={() => upDateTableInscriptions()}
          />
        )}
      </Card>
    </Container>
  );
};

export default Admin;
