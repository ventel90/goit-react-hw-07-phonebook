import { useState } from 'react';
import { useCreateContactsMutation, useFetchContactsQuery } from 'redux/contactsSlice';
import { Form, Wrapper, Label, Input, Btn} from './ContactForm.styled';

export const ContactForm = () => {
  const { data } = useFetchContactsQuery();
  const [createContacts] = useCreateContactsMutation();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (data.some(data => data.name === name)) {
      alert(`${name} is already in contacts`);
    } else {
      createContacts({ name, phone });
    }
    onReset();
  };

  const onReset = () => {
    setName('');
    setPhone('');
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Wrapper>
        <Label htmlFor="">
          Name:{' '}
          <Input
            autoComplete="off"
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
      </Wrapper>
      <Wrapper>
        <Label htmlFor="">
          Phone:{' '}
          <Input
            autoComplete="off"
            type="tel"
            name="phone"
            value={phone}
            onChange={handleInputChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
      </Wrapper>

      <Btn type="submit">Add contact</Btn>
    </Form>
  );
};


// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { nanoid } from 'nanoid';
// import { Form, Wrapper, Label, Input, Btn} from './ContactForm.styled';

// import { addContact } from 'redux/operations';
// import { getContacts } from 'redux/selectors';

// export const ContactForm = () => {
//   const dispatch = useDispatch;
//   const contacts = useSelector(getContacts);

//   const handleSubmit = event => {
//     event.preventDefault();
//     const newContact = {
//       id: 'id-' + nanoid(4),
//       name: {name},
//       phone: {phone},
//     };

//     if (contacts.find(contact => contact.name === newContact.name)) {
//       alert(`${newContact.name} is already in contacts`);
//     } else if (name.length === 0) {
//       alert('Fields must be filled!');
//     } else {
//       dispatch(addContact(newContact));
//     }
//     resetForm();
//   };