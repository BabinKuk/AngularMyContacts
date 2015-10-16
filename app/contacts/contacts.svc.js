/*contacts service - encapsulates communication with firebase API*/
(function () {
    // Init Firebase(database url as argument)
    var url = new Firebase('https://babinkukcontacts.firebaseio.com/contacts');
    
    angular.module("myContacts.contacts")
        .factory("contactsSvc", function ($http, $q, $filter, $firebaseArray) {
            return {
                //get contacts
                getContacts: getContacts,
                //add contact
                addContact: addContact,
                //update contact
                updateContact: updateContact,
                 //delete contact
                deleteContact: deleteContact
            }

            //get contacts
            function getContacts(){
                console.log('in getContacts');
                
                // get Contacts
                var output = $firebaseArray(url);
                console.log(output);
                
                return output;
            }

            //add contact
            function addContact(contacts, newContact) {
                console.log('in addContact', contacts, '\nnewContact ',  newContact);

                //add contact
                contacts.$add(newContact)
                    .then(function(url){
                        //primary key
                        var id = url.key();
                        console.log('Added Contact with ID: ', id);
                    })
                ;
            }

            //update contact
            function updateContact(contacts, contact) {
                console.log('in updateContact', contacts, '\nrecord ',  contact);

                //update contact
                contacts.$save(contact)
                    .then(function(url){
                        //primary key
                        var id = url.key();
                        console.log('Updated Contact with ID: ', id);
                    })
                ;
            }

            //delete contact
            function deleteContact(contacts, contact) {
                console.log('in deleteContact', contacts, '\ncontact ',  contact);

                //add contact
                contacts.$remove(contact)
                    .then(function(url){
                        //primary key
                        var id = url.key();
                        console.log('Removed Contact with ID: ', id);
                    })
                ;
            }            

        });
}());