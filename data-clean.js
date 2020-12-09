/**
 * Sorts input data into the following columns:
 * -------------------------------------------------------------------------
 * First Name | Last Name | Email | .com Emails | Email Host | Company Name |
 * -------------------------------------------------------------------------
 * 
 * In the best case, input data can look like:
 * 
 * FirstName LastName (email@email.com)
 *
 * but this script can also handle messier data like this:
 *
 * Dr. FirstName (nickname) MI. LastName, MBA, PhD
 * (email1@email1.com / email2@email2.com
 *
 *
 * @param {dataCell|Array<Array<number>>} input The cell or range of cells
 *        to be cleaned up. 
 * @return The cleaned up data
 * @customfunction
 */

function cleanUp(input) {


    if (Array.isArray(input)){
  
      return input.map(row => row.map(cell => cleanUp(cell)));
  
    }
    
    // Remove new lines
    input = input.replace(/(\r\n|\n|\r)/gm, " ");
    
    // Remove unicode line separator (0x2028)
    input = input.replace(/\u2028/g, "");
    
    // Remove commas
    input = input.replace(/,/g, "");
    
    // Remove "Dr."
    // It is safe to do this because 
    // we won't delete emails with dr.
    // due to case sensitivity)
    input = input.replace("Dr.", "");
    
    // Remove "MBA"
    input = input.replace("MBA", "");
    
    // Remove "PhD"
    input = input.replace(/Phd|Ph.D.|PhD/g, "");
    
    // Remove middle initial
    const re = /\s(\w)\./i;
    input = input.replace(re, "");
    
    // Remove leading white space
    input = input.replace(/\s+|^/, "");
    
    // Remove trailing white space
    input = input.replace(/\s+$/, "");
    
    // Return in lowercase
    return input.toLowerCase();
   
  }
  
  /**
   * Cleans up company name data according to Brex BD Intern Take Home Assignment Specs
   * 
   * @param {dataCell|Array<Array<number>>} input The cell or range of cells
   *        to be cleaned up. 
   * @return The cleaned up data
   * @customfunction
   */
  function companyCleanUp(input) {
  
    if (Array.isArray(input)){
  
      return input.map(row => row.map(cell => companyCleanUp(cell)));
  
    }
  
    // Remove new lines
    input = input.replace(/(\r\n|\n|\r)/gm, " ");
    
    // Remove unicode line separator (0x2028)
    input = input.replace(/\u2028/g, "");
  
    // Remove leading white space
    input = input.replace(/\s+|^/, "");
    
    // Remove trailing white space
    input = input.replace(/\s+$/, "");
  
    return input;
  
  }
  
  /**
   * Returns first name
   *
   * @param {dataCell|Array<Array<number>>} input The cell or range of cells
   *        to be parsed. 
   * @return First name
   * @customfunction
   *
   */
  function getFirstName(input) {
  
    if (Array.isArray(input)){
  
      const cleaned = cleanUpArray(input);
      return input.map(row => row.map(cell => getFirstName(cell)));
  
    }
  
    // Clean input
    const cleaned = cleanUp(input);
  
    // Match first word 
    const re = /^([^\s]*?)\s/;
    const name = cleaned.match(re)[1];
    return name;
  }
  
  /**
   * Returns last name
   *
   * @param {dataCell|Array<Array<number>>} input The cell or range of cells
   *        to be parsed. 
   * @return Last name
   * @customfunction
   *
   */
  function getLastName(input) {
  
    // If input is a range of cells
    if (Array.isArray(input)){
      const cleaned = cleanUpArray(input);
      return input.map(row => row.map(cell => getLastName(cell)));
    }
    
    const cleaned = cleanUp(input);
  
    // Match string that is followed by and email address in "()"
    const re = /\s([^\s]+)\s+\(.*@.*/;
    const name = cleaned.match(re)[1];
    return name;
  }
  
  
  /* -----------------------------------------
   * For matching with first and last name, 
   * working inwards from start of data and
   * start of email address allows us to
   * avoid dealing with the inbetween
   * characters like middle initials
   * and nicknames
   * -----------------------------------------*/
  
  /**
   * Returns first email address listed in parentheses
   *
   * @param {dataCell|Array<Array<number>>} input The cell or range of cells
   *        to be parsed. 
   * @return Email address
   * @customfunction
   *
   */
  function getEmail(input) {
  
    // If input is a range of cells
    if (Array.isArray(input)){
      const cleaned = cleanUpArray(input);
      return input.map(row => row.map(cell => getEmail(cell)));
    }
    
    // Clean input
    const cleaned = cleanUp(input);
  
    // Match string that follows a "(" and includes a middle "@"
    const re = /\(([^\s]+@[^\s\)]+)/;
    const email = cleaned.match(re)[1];
    return email;
  }
  
  /**
   * Returns first email address listed in parentheses if is ends in ".com"
   *
   * @param {dataCell|Array<Array<number>>} input The cell or range of cells
   *        to be parsed. 
   * @return .com email address 
   * @customfunction
   *
   */
  function getDotComEmail(input) {
  
    // If input is a range of cells
    if (Array.isArray(input)){
      const cleaned = cleanUpArray(input);
      return input.map(row => row.map(cell => getDotComEmail(cell)));
    }
    
    // Clean input
    const cleaned = cleanUp(input);
    const email = getEmail(cleaned);
    
    if (email.endsWith(".com")){
      return email
    }
    
    return "";
  }
  
  /**
   * Returns domain of first email address in parentheses
   *
   * @param {dataCell|Array<Array<number>>} input The cell or range of cells
   *        to be parsed. 
   * @return Email domain
   * @customfunction
   *
   */
  function getEmailDomain(input) {
  
    // If input is a range of cells
    if (Array.isArray(input)){
      const cleaned = cleanUpArray(input);
      return input.map(row => row.map(cell => getEmailDomain(cell)));
    }
    
    // Clean input
    const cleaned = cleanUp(input);
    const email = getEmail(cleaned);
  
    // Match everything after the @ sign
    const re = /@(.+)/;
    domain = email.match(re)[1];
    return domain;
  }