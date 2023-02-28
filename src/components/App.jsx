import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Container} from './App.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './FilterContacts/FilterContacts';
import { ContactList } from './ContactList/ContactList';
import { fetchContacts } from 'redux/operations';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  
  return (
    <Container>
      <h1>PhoneBook</h1>
      <ContactForm />
      <Filter />
      <h1>Contacts</h1>
      <ContactList />
    </Container>
  );
};
