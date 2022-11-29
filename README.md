<div align="center">
  <h1> <img src="https://raw.githubusercontent.com/JohnnyDiep1021/Personal-Budget-App/main/Frontend/img/eSaving-logo48.png" alt="Personal Budget/ E=saving logo"/>E-saving App</h1>
  <strong>An app simulates the e-saving features of the banking app, using the envelope technique to manage a personal budget</strong><br>
</div>
<br>

## Why build this project?
Utilizing and simulating the e-saving functionalities of the actual banking app, [Personal Budget/ E-Saving App](https://personal-budget-f770f.web.app/auth) helps to facilitate budget allocation and saving effortlessly. The app was built with a modern, and simplistic UI and easy-to-use features. It was incorporated all the underlying traits of a responsive full-stack MERN application and only used as a personal project. This app is completely responsive and compatible with all digital devices from mobiles to computers. **E-Saving app** will enable users to have a fresh and intriguing experience in allocating and managing personal budgets.

## Features
1. Sign up for a new account or sign in for an existing one by using email/ username and password (with detailed input prompts).
2. Perform CRUD operations on envelopes:
  + Create new envelopes with title, budget, and detailed notes.
  + View all current created envelopes in the home page.
  + Update current envelope's data ( title, amount of money, and detailed notes).
  + Delete current envelopes permanently.
3. Perform CRUD operations on personal account information:
  + Create a new user account.
  + View personal information (username. email, expertise, name).
  + Self-customize/ edit personal information such as uploading profile image, or modifying personal data. 
4. Transfer money between different envelopes.
5. Deposit virtual money into the envelopes.
6. Auto account login/ logout (expired in 1 hour)

## How to use?
1. Register **new accounnt** with user-defined **email/username** and **password**
2. After signing in successfully, spend time exploring all features.
  
## Technologies
1) ### Frontend:
- **E-saving App** is a single-page application (SPA), constructed with ReactJs. Using:
  + **Custom hooks** manages form data input, sending requests, and authentication.
  + **react-router-dom** is used to simulate multi-page applications.
  + **css** is used for styles and decorations.
  + **firebase** for file upload.
- **The user interface** is simplistic, and modern, but completely intriguing with the real-form design of envelopes. This allows users to experience the actual process of opening the envelopes and then putting money into them. 
- Different slide-in modals display personal account information, transfer and deposit operations.

2) ### Backend:
- Featured by RESTful APIs and implemented by MongoDB, ExpressJs, and NodeJs. Using:
  + **mongodb**, **mongoose** for data storage.
  + **cors** for setting up cross-site resource sharing permissions.
  + **express** for building web framework, **express-validator** for handling and validating input data sent from client-side.
  + **aws-sdk** for image upload.
  + **body-parser** for parsing request data.
  + **jsonwebtoken**, **bcrypt** for creating authToken and hashing user's password.
  + **validator** for validating input data into mongoose schema.

## What needs to be improved and enhanced?
Although **E-saving App** is usable, accessible, and successfully features all basic functionalities for budget management, there are still more features that can be incorporated for more advanced tasks:
  + Setting up reminders with schedule for each different envelope.
  + Authentic payment.
  + Sort envelopes by created date, time, or title. 
  + A more secure way to store user data (token, userId,...) used for auto-login/ logout instead of storing it in easily-mutable local storage.
  +  More configurations, and settings for user account.

## Closing notes
For more realistic experience and vivid imagination, please spend time exploring and playing around with the [Personal Budget/ E-Saving App](https://personal-budget-f770f.web.app/auth). Enjoy :blush:! 

*I welcome all user's feedbacks and reviews. Your contributions can help me to grow better. Thank you :handshake:!*
