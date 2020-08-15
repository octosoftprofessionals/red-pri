import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import CenteredImage from '../CenteredImage';
import ContactInfo from './ContactInfo';
import ShareSocialNetworks from '../../components/ShareSocialNetworks';
import { server } from '../../config';

const CardTitle = styled.h4`
  font-weight: bold;
  text-transform: capitalize;
`;

const MatrTitle = styled.h6`
  text-transform: capitalize;
`;

const ClampedContent = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
  cursor: pointer;
`;

const HideOnSm = styled.div`
  @media (max-width: 576px) {
    display: none;
  }
`;

const ShowOnSm = styled.div`
  display: none;
  @media (max-width: 576px) {
    display: block;
  }
`;

const ShareSocialNetwork = styled(ShareSocialNetworks)`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 125px;
`;

const ProfesionalCard = (props) => {
  return (
    <Card className={`d-flex ${props.className}`}>
      <div className="d-flex" style={{ position: 'relative' }}>
        <Link href={`/perfil/${props.username}`}>
          <CenteredImage src={props.picUrl} />
        </Link>
        <div style={{ zIndex: 1, padding: '1em' }}>
          <CardTitle>
            {props.name} {props.surname}
          </CardTitle>
          <MatrTitle>
            {props.title} - Mat. {props.matricula}
          </MatrTitle>
          <HideOnSm>
            <ClampedContent>{props.about}</ClampedContent>
          </HideOnSm>
          <ContactInfo
            price={props.price}
            phoneList={props.phoneList}
            email={props.email}
          />
        </div>
        <ShareSocialNetwork
          url={`${server}/perfil/${props.username}`}
        />
      </div>
      <ShowOnSm>
        <div style={{ padding: '1em' }}>
          <ClampedContent>{props.about}</ClampedContent>
        </div>
      </ShowOnSm>
    </Card>
  );
};

export default styled(ProfesionalCard)`
  margin-bottom: 1em;
  padding: 0;
  overflow: hidden;
  a {
    cursor: pointer;
  }
  p {
    margin: 0;
  }
`;