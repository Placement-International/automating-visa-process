require('dotenv').config()

const { test } = require('@playwright/test');
test("hubspot login", async ({ browser }) => {
  const context = await browser.newContext({
    storageState: "./auth.json"
  })

  //opens HubSpot
  const page = await context.newPage();
  await page.goto("https://www.hubspot.com/");
  await page.waitForTimeout(3000);
  
  //close cookies
  await page.getByRole('button', { name: 'Allow cookies' }).click();
  await page.getByRole('link', { name: 'Go to my account' }).click();
  
  //scrap data
  await page.goto("https://app.hubspot.com/contacts/4209490/lists/21403/filters");
  const candidateData = await page.locator('//*[@id="crm"]/div[3]/div[1]/div/div/div/div/div/div/section/div/div/main/div/div/div[2]/div/div/div/div[1]/div/div[1]/table/tbody/tr/td[2]/div/a/span/span').textContent();
  const newCandidateData = candidateData.split(" ");
  const candidateName = newCandidateData[0];
  const candidateLastName = newCandidateData[1];
  const candidateEmail = await page.locator('//*[@id="crm"]/div[3]/div[1]/div/div/div/div/div/div/section/div/div/main/div/div/div[2]/div/div/div/div[1]/div/div[1]/table/tbody/tr/td[3]/a').textContent();
  const skypeID = await page.locator('//*[@id="crm"]/div[3]/div[1]/div/div/div/div/div/div/section/div/div/main/div/div/div[2]/div/div/div/div[1]/div/div[1]/table/tbody/tr/td[4]/span').textContent();
  const programOption = await page.locator('//*[@id="crm"]/div[3]/div[1]/div/div/div/div/div/div/section/div/div/main/div/div/div[2]/div/div/div/div[1]/div/div[1]/table/tbody/tr/td[5]/span').textContent();
  await page.locator('//*[@id="crm"]/div[3]/div[1]/div/div/div/div/div/div/section/div/div/main/div/div/div[2]/div/div/div/div[1]/div/div[1]/table/tbody/tr/td[2]/div/a/span/span').click();
  const programDate = await page.getByLabel('Program Start Date (visa)').inputValue();
  const botTIPP = await page.getByText('Bot TIPP').nth(1).inputValue();
  const property = await page.getByText('Property', { exact: true }).inputValue();
  //+ properties
  const field = await page.getByText('Training Areas').first().inputValue();
  const experienceYears = await page.getByText('Experience in Field (number of years)').inputValue(); //what if its empty??
  const degreeType =  'ADD INFO'
  const dateAwardedOrExpected = await page.getByText('Graduation date').inputValue();
  const trainingStarts = await page.getByText('Program Start Date (visa)').inputValue();
  const trainingEnds = await page.getByText('Program end date').inputValue();
  
  //property search ✅
  await page.getByRole('menuitem', { name: 'Contacts' }).click();
  await page.getByRole('menuitem', { name: 'Companies' }).click();
  await page.goto('https://app.hubspot.com/contacts/4209490/objects/0-2?redirectFrom=crm-records-ui');
  await page.goto('https://app.hubspot.com/contacts/4209490/objects/0-2/views/all/list?redirectFrom=crm-records-ui');
  await page.locator('[data-test-id="index-page-search"]').click();
  await page.locator('[data-test-id="index-page-search"]').fill(`${property}`);
  await page.getByRole('link', { name: `${property}` }).click();
  
  //SECTION 2 - COMPENSATION
  const organizationName = property
  const address = await page.getByText('Street address').inputValue();
  const city =  await page.getByText('City', { exact: true }).inputValue();
  const state =  await page.getByText('State/Region').inputValue(); //FIX
  const zipCode = await page.getByText('Postal code').inputValue();
  const websiteURL = await page.getByLabel('Website URL').inputValue();
  const employerID = await page.getByText('Tax ID').inputValue();
  const exchangeVisitorHours = 'ADD INFO';
  // will the intern/trainee be paid a stipend? if yes -> 
  const hourlyStipend = 'ADD INFO';
  //will the participant recieve other compensation? if yes -> 
  const compensationStipend = 'ADD INFO';
  //Does the organization have a Workers' Compensation policy? if yes ->
  const carrierName =  await page.getByText('Name of Workers\' Compensation').inputValue();
  //Does your Workers’ Compensation policy cover Exchange Visitors?
  const numberEmployees = await page.getByText('Number of employees').inputValue();
  //annual revenue -> click one option
  //const annualRevenue = await page.getByText('Annual Revenue of the company')
  //console.log(annualRevenue)


  //SECTION 4 - Training/Internship Placement Plan ✅
  const mainProgramSupervisor = await page.getByText('Main Program Supervisor', { exact: true }).nth(1).inputValue();
  const mainProgramSupervisorTitle = await page.getByText('Title Main Program Supervisor').nth(1).inputValue();
  const supervisorPhone = await page.getByText('Main Program Supervisor\'s Phone').nth(1).inputValue(); 
  const supervisorMail = await page.getByText('Email Main Program Supervisor').nth(1).inputValue();
  // training internship = field


  //PHASE INFORMATION
  const phaseSiteName = property
  const phaseSiteAddress = address
  const phaseName = 'ADD INFO';
  const startDateofPhase = '00/00/00'; //CHANGE
  const endDateofPhase = '00/00/00'; //CHANGE
  const primaryPhaseSupervisor = 'ADD INFO';
  const phaseSupervisorTitle = 'ADD INFO';
  const phaseSupervisorMail = 'ADD INFO';
  const phaseSupervisorNumber = 'ADD INFO';

  //TEXT FIELDS
  const descriptionOfRole = 'ADD INFO';
  const goalsAndObjectives = 'ADD INFO';
  const listOfNames = 'ADD INFO';
  const culturalActivities = 'ADD INFO';
  const specificKnowledge = 'ADD INFO';
  const howTechniquesWillBeTaught = 'ADD INFO';
  const howMeasured = 'ADD INFO';



  console.log(
    `CANDIDATE INFO:
              Candidate Name: ${candidateName}\n 
              Candidate Last Name: ${candidateLastName}\n 
              Candidate Email: ${candidateEmail}\n 
              SkypeID: ${skypeID}\n
              Program Option: ${programOption}\n
              Program Date: ${programDate}
              Bot TIPP: ${botTIPP}
              `
  )

  await page.goto("https://geo.greenheart.org/General/applogin.aspx");
  await page.getByLabel('User Name:').click();
  await page.getByLabel('User Name:').fill(`${process.env.GREENHEART_USERNAME}`);
  await page.getByLabel('Password:').click();
  await page.getByLabel('Password:').fill(`${process.env.GREENHEART_PASSWORD}`);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('#ctl00_navMenu').getByRole('link', { name: 'Participants' }).click();
  await page.getByRole('link', { name: 'Create New Participant' }).click();
  await page.getByRole('combobox', { name: 'Step 1. Select which program you wish to add participants to.' }).selectOption('12');
  await page.getByRole('combobox', { name: 'Step 2. Select which season you wish to add participants to. Step 4. Enter Participants Information.' }).selectOption('4083');
  await page.getByLabel('Manually You will need to enter the information for each participant one at a time.').check();
  await page.locator('#ctl00_Body_ucPartnerParticipant_dgParticipant_ctl03_FirstName').click();
  await page.locator('#ctl00_Body_ucPartnerParticipant_dgParticipant_ctl03_FirstName').fill(`${candidateName}`);
  await page.locator('#ctl00_Body_ucPartnerParticipant_dgParticipant_ctl03_LastName').click();
  await page.locator('#ctl00_Body_ucPartnerParticipant_dgParticipant_ctl03_LastName').fill(`${candidateLastName}`);
  await page.locator('#ctl00_Body_ucPartnerParticipant_dgParticipant_ctl03_Email').click();
  await page.locator('#ctl00_Body_ucPartnerParticipant_dgParticipant_ctl03_Email').fill(`${candidateEmail}`);
  await page.locator('#ctl00_Body_ucPartnerParticipant_dgParticipant_ctl03_SkypeUsername').click();
  await page.locator('#ctl00_Body_ucPartnerParticipant_dgParticipant_ctl03_SkypeUsername').fill(`${skypeID}`);
  if (programOption.includes('Trainee')){
    await page.locator('#ctl00_Body_ucPartnerParticipant_dgParticipant_ctl03_ProgramOptionID').selectOption('15');
  } else {
    await page.locator('#ctl00_Body_ucPartnerParticipant_dgParticipant_ctl03_ProgramOptionID').selectOption('10');
  }
  await page.locator('#ctl00_Body_ucPartnerParticipant_dgParticipant_ctl03_ucDateChooser_Date').click();
  await page.locator('#ctl00_Body_ucPartnerParticipant_dgParticipant_ctl03_ucDateChooser_Date').fill(`${programDate}`);
  //uncheck login
  await page.locator('#ctl00_Body_ucPartnerParticipant_dgParticipant_ctl03_chkEmailParticipant').uncheck();
  //await page.screenshot({ path: 'screenshot.png' });
  //await page.getByRole('button', { name: 'Add Participants' }).click();
  
  //------------------------------------------------------------FIRST PART OF THE APPLICATION FINISHED --------------------------------------------------------

  //aditional exchange info
  const page1 = await context.newPage();
  await page1.goto('https://geo.greenheart.org/partners/Participants/Default.aspx');
  await page1.locator('#ctl00_ucParticipantSearch_ddlParticipantSearch').selectOption('Email');
  await page1.locator('#ctl00_ucParticipantSearch_jsSearchString').click();
  await page1.locator('#ctl00_ucParticipantSearch_jsSearchString').fill(`${candidateEmail}`);
  await page1.getByRole('button', { name: 'Go' }).click();
  await page1.locator('//*[@id="ctl00_Body_dgParticipant"]/tbody/tr[2]/td[3]').click();
  
  const page2Promise = page1.waitForEvent('popup');
  const page2 = await page2Promise;
  
  //section one
  if (programOption.includes('Trainee')){
    await page2.getByRole('combobox', { name: 'Program Category:' }).selectOption('2'); //trainee
  } else {
    await page2.getByRole('combobox', { name: 'Program Category:' }).selectOption('3'); // intern
  } 
  await page2.getByRole('combobox', { name: 'Occupational Category:' }).selectOption('4'); //hospitality
  
  await page2.getByLabel('Current Field of Study/Profession:').click();
  await page2.getByLabel('Current Field of Study/Profession:').fill(`${field}`);
  await page2.getByLabel('Experience in Field (number of years):').click();
  await page2.getByLabel('Experience in Field (number of years):').fill(`${experienceYears}`);
  await page2.getByLabel('Type of Degree or Certificate:').click();
  await page2.getByLabel('Type of Degree or Certificate:').fill(`${degreeType}`);
  await page2.locator('#ctl00_ContentPlaceHolder1_pnlTIPPInfo_DateAwardedOrExpected_Date').click();
  await page2.locator('#ctl00_ContentPlaceHolder1_pnlTIPPInfo_DateAwardedOrExpected_Date').fill(`${dateAwardedOrExpected}`);
  await page2.locator('#ctl00_ContentPlaceHolder1_pnlTIPPInfo_TrainingStartDate_Date').click();
  await page2.locator('#ctl00_ContentPlaceHolder1_pnlTIPPInfo_TrainingStartDate_Date').fill(`${trainingStarts}`);
  await page2.locator('#ctl00_ContentPlaceHolder1_pnlTIPPInfo_TrainingEndDate_Date').click();
  await page2.locator('#ctl00_ContentPlaceHolder1_pnlTIPPInfo_TrainingEndDate_Date').fill(`${trainingEnds}`);
  await page2.locator('#ctl00_ContentPlaceHolder1_btnNextBottom').click();

  //section two
  await page2.getByLabel('Organization Name:').click();
  await page2.getByLabel('Organization Name:').fill(`${organizationName}`);

  await page2.getByLabel('Address:').click();
  await page2.getByLabel('Address:').fill(`${address}`);
  await page2.getByRole('row', { name: '* Address:', exact: true }).getByRole('cell').nth(2).click();
  await page2.getByLabel('City :').click()
  await page2.getByLabel('City :').fill(`${city}`);
  //fix STATE
  //await page2.getByRole('combobox', { name: 'State:' }).selectOption({ label: `${state}` });
  await page2.getByLabel('Zip Code:').click();
  await page2.getByLabel('Zip Code:').fill(`${zipCode}`);
  await page2.getByRole('row', { name: '* City :', exact: true }).getByRole('cell').nth(2).click();
  await page2.getByLabel('Website URL:').click();
  await page2.getByLabel('Website URL:').fill(`${websiteURL}`);
  await page2.getByLabel('Employer ID Number (EIN):').click();
  await page2.getByLabel('Employer ID Number (EIN):').fill(`${employerID}`);
  //fix stipendSection
  await page2.getByLabel('Exchange Visitor Hours Per Week:').click();
  await page2.getByLabel('Exchange Visitor Hours Per Week:').fill(`${exchangeVisitorHours}`);
  await page2.locator('#ctl00_ContentPlaceHolder1_pnlTIPPInfo_StipendAmount').click();
  await page2.locator('#ctl00_ContentPlaceHolder1_pnlTIPPInfo_StipendAmount').fill(`${hourlyStipend}`);
  await page2.locator('#ctl00_ContentPlaceHolder1_pnlTIPPInfo_StipendFrequency').selectOption('Item01');
  await page2.getByRole('row', { name: '* Will the participant receive other compensation? Yes No', exact: true }).getByLabel('Yes').check();
  await page2.locator('#ctl00_ContentPlaceHolder1_pnlTIPPInfo_NonMonetaryAmount').click();
  await page2.locator('#ctl00_ContentPlaceHolder1_pnlTIPPInfo_NonMonetaryAmount').fill(`${compensationStipend}`);
  await page2.locator('#ctl00_ContentPlaceHolder1_pnlTIPPInfo_NonMonetaryFrequency').selectOption('Item01');
  //Does the organization have a Workers' Compensation policy?
  if (carrierName) {
    await page2.getByRole('row', { name: 'Does the organization have a Workers\' Compensation policy? Yes No', exact: true }).getByLabel('Yes').check();
    await page2.getByLabel('If yes, what is the name of the carrier?').click();
    await page2.getByLabel('If yes, what is the name of the carrier?').fill(`${carrierName}`);
  
  } else {
    await page2.getByRole('row', { name: 'Does the organization have a Workers\' Compensation policy? Yes No', exact: true }).getByLabel('No').check();
  }
  await page2.getByLabel('Number of Full-Time Employees Onsite at Location:').click();
  await page2.getByLabel('Number of Full-Time Employees Onsite at Location:').fill(`${numberEmployees}`);
  
  //Annual Revenue
  
  // if (){
  //   await page2.getByLabel('$0 to $3 Million').check();
  // } else if () {
  //   await page2.getByLabel('$3 Million to $10').check();

  // } else if () {
  //   await page2.getByLabel('$10 Million to $25').check();
  // } else {
  //   await page2.getByLabel('$25 Million or More').check();
  // }
  

  //section three

  
  await page2.getByLabel('Main Program Supervisor/POC at Host Organization:').click();
  await page2.getByLabel('Main Program Supervisor/POC at Host Organization:').fill(`${mainProgramSupervisor}`);
  await page2.getByLabel('Main Program Supervisor\'s Title:').click();
  await page2.getByLabel('Main Program Supervisor\'s Title:').fill(`${mainProgramSupervisorTitle}`);
  await page2.getByLabel('Supervisor\'s Phone:').click();
  await page2.getByLabel('Supervisor\'s Phone:').fill(`${supervisorPhone}`);
  await page2.getByLabel('Supervisor\'s Email:').click();
  await page2.getByLabel('Supervisor\'s Email:').fill(`${supervisorMail}`);
  await page2.getByLabel('Training/Internship field:').click();
  await page2.getByLabel('Training/Internship field:').fill(`${field}`);
  await page2.locator('#ctl00_ContentPlaceHolder1_btnNextBottom').click();

  //Phase Information

  //await page2.getByText('« Previous Changes will be saved when Next is clicked.').first().click();

  await page2.getByLabel('Phase Site Name:').click();
  await page2.getByLabel('Phase Site Name:').fill(`${phaseSiteName}`);
  await page2.getByLabel('Phase Site Address:').click();
  await page2.getByLabel('Phase Site Address:').fill(`${phaseSiteAddress}`);
  await page2.locator('#ctl00_ContentPlaceHolder1_PhaseStartDate_Date').click();
  await page2.locator('#ctl00_ContentPlaceHolder1_PhaseStartDate_Date').fill(`${startDateofPhase}`);
  await page2.getByLabel('Primary Phase Supervisor:').click();
  await page2.getByLabel('Primary Phase Supervisor:').fill(`${primaryPhaseSupervisor}`);
  await page2.getByLabel('Phase Name:').click();
  await page2.getByLabel('Phase Name:').fill(`${phaseName}`);
  await page2.locator('#ctl00_ContentPlaceHolder1_PhaseEndDate_Date').click();
  await page2.locator('#ctl00_ContentPlaceHolder1_PhaseEndDate_Date').fill(`${endDateofPhase}`);
  await page2.getByLabel('Supervisor Title:').click();
  await page2.getByLabel('Supervisor Title:').fill(`${phaseSupervisorTitle}`);
  await page2.getByLabel('Email:').click();
  await page2.getByLabel('Email:').fill(`${phaseSupervisorMail}`);
  await page2.getByLabel('Phone Number:').click();
  await page2.getByLabel('Phone Number:').fill(`${phaseSupervisorNumber}`);
  
  //QUESTIONS
  await page2.getByLabel('Description of Trainee/Intern\'s role for this program or phase').click();
  await page2.getByLabel('Description of Trainee/Intern\'s role for this program or phase').fill(`${descriptionOfRole}`);
  await page2.getByLabel('Specific goals and objectives for this program or phase').click();
  await page2.getByLabel('Specific goals and objectives for this program or phase').fill(`${goalsAndObjectives}`);
  //await page2.getByRole('cell', { name: '* Description of Trainee/Intern\'s role for this program or phase', exact: true }).click();
  //await page2.getByRole('cell', { name: '* Specific goals and objectives for this program or phase', exact: true }).click();
  await page2.getByLabel('Please list the names and titles of those who will provide continuous (for example, daily) supervision of the Trainee/Intern, including the primary\nsupervisor. What are these persons\' qualifications to teach the planned learning?').click();
  await page2.getByLabel('Please list the names and titles of those who will provide continuous (for example, daily) supervision of the Trainee/Intern, including the primary\nsupervisor. What are these persons\' qualifications to teach the planned learning?').fill(`${listOfNames}`);
  await page2.getByLabel('What plans are in place for the Trainee/Intern to participate in cultural activities while in the United States?').click();
  await page2.getByLabel('What plans are in place for the Trainee/Intern to participate in cultural activities while in the United States?').fill(`${culturalActivities}`);
  await page2.getByLabel('What specific knowledge, skills, or techniques will be learned?').click();
  await page2.getByLabel('What specific knowledge, skills, or techniques will be learned?').fill(`${specificKnowledge}`);
  await page2.getByLabel('How specifically will these knowledge, skills, or techniques be taught? Include specific tasks and activities (Interns) and/ or methodology of training\nand chronology/syllabus (Trainees).').click();
  await page2.getByLabel('How specifically will these knowledge, skills, or techniques be taught? Include specific tasks and activities (Interns) and/ or methodology of training\nand chronology/syllabus (Trainees).').fill(`${howTechniquesWillBeTaught}`);
  await page2.getByLabel('How will the Trainee/Intern\'s acquisition of new skills and competencies be measured?').click();
  await page2.getByLabel('How will the Trainee/Intern\'s acquisition of new skills and competencies be measured?').fill(`${howMeasured}`);
  //await page2.getByLabel('Additional Phase Remarks (optional)').click();
  //await page2.getByLabel('Additional Phase Remarks (optional)').fill('additional remarks');
  //await page2.getByRole('button', { name: 'Save' }).click();

  console.log("Process Completed ✨")
});