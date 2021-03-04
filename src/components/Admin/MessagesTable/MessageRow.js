import React, { useState } from 'react';
import Router from 'next/router';
import { LoadableButton } from '../../Loadable';

const MessageRow = ({
  key,
  message,
  onSelectInscription,
  checked,
}) => {
  const { name, email, content } = message;
  const [loading, setLoading] = useState(false);

  const handleDelete = async (event) => {
    event.preventDefault();
    const msg = `¿Seguro que querés borrar el mensaje de ${message.email}?`;
    if (!confirm(msg)) {
      return;
    }

    setLoading(true);
    const res = await fetch(`/api/messages/${message._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 200) {
      console.log('finish');
      Router.reload();
    } else {
      const resJson = await res.json();
      alert(resJson.error);
    }
  };

  return (
    <tr key={key}>
      <td style={{ textAlign: 'center' }}>
        <input
          loading={loading}
          type="checkbox"
          value={checked}
          onChange={onSelectInscription}
        />
      </td>
      <td>{message._id}</td>
      <td>{name}</td>
      <td>
        <a href={'mailto:' + email}>{email}</a>
      </td>
      <td>{content}</td>
      <td>
        <LoadableButton
          disabled={loading}
          loading={loading}
          variant="danger"
          onClick={handleDelete}
        >
          Eliminar
        </LoadableButton>
      </td>
    </tr>
  );
};

export default MessageRow;
