import { useSelector } from "react-redux";
import { useDeleteContactsMutation, useFetchContactsQuery } from "redux/contactsSlice";
import { getFilter } from "redux/selectors";
import {
  Btn,
  Contacts,
  ContactItem,
  Name,
  Number,
  Loading,
} from './ContactList.styled';


const filteredContacts = (contacts, filter) => {
  if (filter === '') {
    return contacts;
  } return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase())
  );
};

export const ContactList = () => {
  const { data, isFetching, isError, isSuccess } = useFetchContactsQuery();
  const [deleteContacts, { isLoading: isDeleting }] = useDeleteContactsMutation();
  const filter = useSelector(getFilter);
  const contactsList = filteredContacts(data, filter);

    return (
      <>
        <Loading>
          {isFetching && !isError && <p>Request in progress... 👌</p>}
          {isError && <p>Error</p>}
        </Loading>
        {isSuccess &&
          <Contacts>
            {contactsList.map(({ id, name, phone }) => {
              return (
                <ContactItem key={id}>
                  <Name>{name}</Name>
                  <Number>{phone}</Number>
                  <Btn type="button" onClick={() => deleteContacts(id)}>
                    {isDeleting ? `Delete...` : `Delete`}
                  </Btn>
                </ContactItem>
              );
            })}
          </Contacts>}
      </>
    );
}

// import { useDispatch, useSelector } from 'react-redux';
// import { getFilter, getContacts } from 'redux/selectors';
// import { deleteContact } from 'redux/operations';
// import {
//   Btn,
//   Contacts,
//   ContactItem,
//   Name,
//   Number,
// } from './ContactList.styled';

// export const ContactList = () => {
//   const dispatch = useDispatch();
//   const contacts = useSelector(getContacts);
//   const filter = useSelector(getFilter);
  
//   const filteredContacts = contacts.filter(contact =>
//     contact.name.toLowerCase().includes(filter.toLowerCase())
//   );

  // return (
  //   <>
  //     <Contacts>
  //       {filteredContacts.map(({ id, name, phone }) => {
  //         return (
  //           <ContactItem key={id}>
  //             <Name>{name}</Name>
  //             <Number>{phone}</Number>
  //             <Btn type="button" onClick={() => dispatch(deleteContact(id))}>
  //               Delete
  //             </Btn>
  //           </ContactItem>
  //         );
  //       })}
  //     </Contacts>
  //   </>
  // );
// };
