import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Container, Loading } from './App.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './FilterContacts/FilterContacts';
import { ContactList } from './ContactList/ContactList';
import { fetchContacts } from 'redux/operations';
import { getError, getIsLoading } from 'redux/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  
  return (
    <Container>
      <h1>PhoneBook</h1>
      <ContactForm />
      <Filter />
      <Loading>
        {isLoading && !error && <p>Request in progress... 👌</p>}
      </Loading>
      <h1>Contacts</h1>
      <ContactList />
    </Container>
  );
};
