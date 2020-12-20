### What does it do?

Turns this:

| Company Name | User                                                         |
| ------------ | ------------------------------------------------------------ |
| Company      | Dr. FirstName (nickname) MI. LastName, MBA, PhD * ([email1@email.com](mailto:email1@email.com) / [email2@email.com](mailto:email2@email.com) |

Into this:

| First Name | Last Name | Email                                         | .com Emails                                   | Email Host | Company Name |
| ---------- | --------- | --------------------------------------------- | --------------------------------------------- | ---------- | ------------ |
| FirstName  | LastName  | [email1@email1.com](mailto:email1@email1.com) | [email1@email1.com](mailto:email1@email1.com) | email.com  | Company      |

To use with Google Sheets, see: https://developers.google.com/apps-script/guides/sheets/functions



### Formatting Decisions and Assumptions:

I decided to make all the first and last names lower case. I thought this was the best way to ensure consistency.I did not translate non-english characters to english. I thought it might be important to know the exact spelling of names.In cases where two email addresses were provided, I kept only the first. The task specifications only asked for one column of emails and it can be bad practice to place two data in the same cell. Additionally, I found that the first email was always (as far as I could tell) the one belonging to the person it was listed under.Rather than delete all the data on people with email domains that do not end in “.com”, I created a separate column to hold only those emails that do end in “.com”. I did however show in the tutorial video how one would go about deleting the data of people with “.com” email addresses. I did not change any casing on company names. In some cases legibility of the name was dependent on a specific casing.




##Reference material:

- General RegEx resource:https://www.regular-expressions.info/
- An EXCELLENT RegEx Debugging tool:https://regex101.com/The above tool provides a quick reference and an intuitive UI that makes working with RegEx almost fun...
- How to write and include custom scripts in your Google Sheets workflow:https://developers.google.com/apps-script/guides/sheets/functions#using_a_custom_function
- A pesky (and often evasive) unicode line-separator character that should be removed from data:https://www.fileformat.info/info/unicode/char/2028/index.htmHas unicode hexadecimal value 0x2028



###My High Level Approach to the Problem

When trying to clean data I always find it useful to first browse through the table. This allows me to get a sense for the shape of the data, the locations of the data I’m interested in and, most importantly, the edge-cases that might make my life difficult. When I set out to find a solution, I hope to find a solution that is robust enough to appropriately handle these edge-cases. That is often not possible, but you can usually get pretty close. 



###### What is an edge case?

For example, in the data I was given for this assignment the general form of the person information was as follows:

**FirstName LastName ([email@address.com](mailto:email@address.com))**

However, if you browse the data set you will come across entries that look more like this:

**FirstName LastName ( \ [email2@address.com](mailto:email2@address.com)**

Or like this:

**FirstName LastName, Ph.D., MBA ( \ [email2@address.com](mailto:email2@address.com)**

Or even like this:

**Dr. FirstName (NickName) LastName, Ph.D., MBA ([email1@address.com](mailto:email1@address.com)) ( [email2@address.com](mailto:email2@address.com))**

This could definitely be a headache for us, that is if we didn’t use the following process.

First construct the “worst case scenario” data entry. You might need a few of them to cover all cases, but try to get it down to one or two. For this data set mine looked like this:

**Dr. FirstName (NickName) MI. LastName  Phd, MBA, (email@email.com) / ([another@email.com](mailto:another@email.com))**

Ok, so you’ve got your worst case scenario constructed. Now you’ll want to remove every piece of information you do not care about. Sometimes you have to be clever about this as things like parentheses can act as markers for your data (as is the case here with the email information). You’ll write a function to remove all these extraneous characters. It is often useful to include leading and trail whitespace in this removal process as well as new line characters.

My worst case scenario now looks like this:

**FirstName LastName  (email@email.com) / ([another@email.com](mailto:another@email.com))**

My head hurts less already. Now, for each piece of information you want to extract you’ll want to find what positional/relational format the piece of information ALWAYS takes.

Let’s do “FirstName” for an easy example. With my newly formatted data I know that “FirstName” ALWAYS starts at the very first word of the string. I also know that it ALWAYS ends just before the first white space character (provided they don’t have two first names that are unhyphenated). I can then use this information to construct a regular expression that will match this pattern. In this case I use:

```
^([^\s]*?)\s
```

This expression means “get me the first string of non-whitespace characters that ends just before the first space”. Once I have extracted “FirstName” from the data I can also do things like turn all the characters to lowercase for consistency, or keep only the first three characters of the name. What you do with the extracted data will depend on your use case. 

That’s all there is to it! I hope this brief guide has been useful! For a more in depth description of how to construct regular expressions please see the references I have provided above.

 