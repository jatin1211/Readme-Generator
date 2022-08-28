// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const license = require("../Develop/utils/generateMarkdown.js");

// TODO: Create an array of questions for user input
const questions = () => {
    return inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is the project title?(Required)',
        validate: nameInput => {
          if(nameInput){
            return true;
          }else{
            console.log('Please enter project title!');
            return false;}
            
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'What is the project description?(Required)',
        validate: description => {
          if(description){
            return true;
          }else{
            console.log('Please enter description!');
            return false;}
        }
      },
      {
        type: 'input',
        name: 'installation',
        message: 'Can you provide Installation instructions?',
      },
      {
        type: 'input',
        name: 'usageInformation',
        message: 'Can you provide Usage information?',
      },
      {
        type: 'input',
        name: 'contributionGuidelines',
        message: 'Can you provide Contributor guidelines?',
      },
      {
        type: 'input',
        name: 'testInstructions',
        message: 'Can you provide Testing Instructions?',
      },
      {
        type:'list',
        name: 'license',
        message: 'Which license is covered by the application?',
        choices:['Apache','Boost','BSD','Creative Commons','Eclipse','GNU','EthicalSource','IBM','ISC','MIT','Mozilla','Open','Perl','SIL','Unlicense','WTFPL','Zlib','Other'],
      },
      {
        type: 'input',
        name: 'github',
        message: 'What is your github username?',
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
      }
      
      
]);
}

// TODO: Create a function to write README file
function writeToFile(data) {
    return `
  # ${data.name}    ${renderLicenseBadge(data.license)}
  ## Description
  * ${data.description}
  ## Table of Contents
  * [Installation](#installation-instructions)
  * [Usage](#usage-information)
  * [Contributing](#contribution-guidelines)
  * [Tests](#tests-instructions)
  * [License](#license)
  * [Questions](#questions)
  
  ## Installation Instructions
  ${data.installation}
  ## Usage Information
  ${data.usageInformation}
  ## Contribution guidelines
  ${data.contributionGuidelines}
  ## Tests Instructions
  ${data.testInstructions}
  ## License
  Application is covered under ${data.license} license.
  
  ## Questions
  * Github Link: https://github.com/${data.github}
  * You can ask me any question via mail: www.${data.email}
     
  `
}


questions()
    .then((data)=>{
      const readme = writeToFile(data);
      
      fs.writeFile('./Readme.md',readme,err =>{
      if (err) throw new Error(err);
      console.log("Readme file created");
    })
  });




