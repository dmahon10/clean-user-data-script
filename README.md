#clean-user-data-script

Turns this:

| Company Name | User | 
|--------------|------|
| Company|Dr. FirstName (nickname) MI. LastName, MBA, PhD * (email1@email.com / email2@email.com |

Into this:

| First Name | Last Name | Email | .com Emails | Email Host | Company Name |
|------------|-----------|-------|-------------|------------|--------------|
| FirstName| LastName |email1@email1.com|email1@email1.com|email.com| Company |


To use with Google Sheets, see: https://developers.google.com/apps-script/guides/sheets/functions