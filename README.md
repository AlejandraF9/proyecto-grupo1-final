# Dummie Bakery – Sweet and handmade, ready to order.

## Description
**Dummie Bakery** is a responsive website for a virtual Cake Boutique offering cakes, sweets, combo boxes, and drinks. Users can place orders for either in-store pickup or home delivery. The project was developed as the final team assignment of the Her-tech JavaScript bootcamp, created by Alejandra, Carmen, Carolina, and Sintra.

## Table of Contents
- [Features](#Features)
- [Tech stack](#Tech-stack)
- [Installation](#Installation)
- [Usage](#Usage)
- [API endpoints](#API-endpoints)
- [Project structure](#Project-structure)
- [Contributors log](#Contributors-log)
- [License](#License)

## Features
- **User authentication with form validation**  
Secure registration, login, and profile editing. All forms (signup, login, contact, newsletter, profile, and payment) include input validation powered by a shared validation module. User feedback is handled using Toastify notifications instead of default alerts.

- **Shopping cart with real-time stock control**  
Users can view product details, choose quantity, select delivery or pickup date, and—when applicable—choose cake sizes (small, medium or large). The cart supports editing or removing individual products, as well as clearing the entire order. Quantity validation is enforced based on product and date availability.

- **Pickup and delivery options**  
Orders can be picked up at one of four physical locations in Tenerife (San Cristóbal de La Laguna, Tacoronte, Santa Úrsula, Icod de los Vinos), or delivered across the island with a €3.90 delivery fee. The system requires selecting the desired method before checkout.

- **Smart date selection and scheduling rules**  
The calendar allows selecting dates from the current day up to 3 months ahead, excluding weekends. Same-day orders are only accepted before 16:30 due to bakery hours (10:00–17:00). The interface prevents invalid selections and provides contextual feedback.

- **Product categories and filtering**  
Products are grouped into cakes, individual sweets, combo boxes, and both hot and cold drinks. Users can browse all products or filter by category, and use the search bar to find items by name or ingredients—partial matches included.

- **User profile and order history**  
Users can view and edit their profile, including their name, email, and avatar — the latter being a selection of bakery-themed icons. All changes can be saved with a dedicated "Save" button. Above this button, a link labeled "Order history" allows users to access a detailed view of their past purchases made with that account. A Logout button is also available to end the session securely.

- **Contact form via EmailJS**
  The website uses **EmailJS** to manage client-side email communication. It is used in two key features:

  - **Newsletter subscription** – When a user subscribes for the first time, an automatic welcome email is sent with a unique discount code. If the user is already subscribed, a separate newsletter template is sent.
  - **Contact form** – A fully working contact form allows users to send inquiries. The form includes input validation to ensure required fields are completed before submission.
Upon submission:
    - The **user** receives an automatic email confirming that their message was received.
    - The **bakery team** receives a copy of the same email, including the user's name, email address, and message.
    - Messages can optionally be saved manually to a separate internal database for tracking or customer support purposes.

  In addition, for **guest purchases** (users not logged in), automatic confirmation emails are sent through the **backend** using the “nodemailer” library in the custom **Api_Bakery** server. These transactions are also recorded in the backend database for tracking and administrative purposes.

- **Admin interface**  
An exclusive section of the website is accessible only to users with the **admin role**. This interface provides full control over store content and user management through multiple views:

- **User management**  
  Displays a list of all registered users. Admins can delete users if necessary.

- **Product management**  
  Allows the admin to view, edit, and update existing products from the store catalog. Admins can upload custom product images directly from their computer. Images are uploaded to “Cloudinary”, which returns a secure URL that is stored in the database and used across the site. In the product list view, a thumbnail image preview has also been added for each item, making the interface more visual and user-friendly.

- **Blog management**  
  The admin can directly **publish** new blog posts or manage the blog history by editing or deleting previous entries.

- **Guest email list**  
  Stores the email addresses of users who complete purchases **without registering**. This list helps track guest activity.

- **Order management**  
  Two distinct views are available:
  - **Daily Orders** – Orders placed for same-day delivery or pickup.
  - **Custom Orders** – Orders scheduled for future dates.  
In both cases, the admin can **update the order status** (e.g., in preparation, ready, delivered). This admin interface ensures the website is fully manageable without requiring direct access to the database.

- **Responsive design**  
The layout was built using a **mobile first** strategy: default styles are optimized for small screens, and media queries progressively adapt the interface for larger devices. The CSS uses modern layout systems like **Flexbox** and **Grid**, and relative units like rem for scalable spacing and font sizing.
The dedicated variables.css file defines custom properties for consistent colors, fonts, and spacing across the site. Additionally, the reset.css file normalizes default browser styles to provide a clean base for customization. This modular setup improves code readability and reusability.
To ensure an optimal experience across devices, the layout adapts through media queries based on the following screen size ranges:
•	**Mobile**: max-width: 760px
•	**Medium screens**: min-width: 761px to max-width: 1028px
•	**Large screens**: min-width: 1029px and up

- **Toastify-based alert system**  
All user notifications are handled with Toastify. Different color tags provide visual feedback:
  - Green (Success): successful actions (e.g. login, registration)
  - Blue (Info): stock info or date restrictions
  - Orange (Warning): missing required selections
  - Red (Error): validation failures or incorrect input

- **Modular project architecture**  
The entire codebase is organized into clearly separated modules by responsibility. Each folder groups related logic—for example, API calls are stored under `/api`, visual pages under `/views`, and helper utilities like validation and toast handling under `/utils`. This structure improves scalability and simplifies navigation across the code. Although comments were intentionally omitted for a clean and minimal style, the naming conventions and file structure ensure readability and maintainability.

## Installation
Follow these steps to run the project locally:
1. **Clone the repository** into an empty folder (make sure it doesn't already contain a Git repository):

   ```bash
   git clone https://github.com/AlejandraF9/proyecto-grupo1-final  

2. Install dependencies:

   ```bash
   Node.js: npm install
   
   Email.js: npm install @emailjs/browser@latest
   
   Toastify: npm install toastify-js

3. Start the development server:
   
   ```bash
   npm run dev
   ```

    And next:

   ```bash
   o 
   
4. Open the app in your browser

   ```bash
   http://localhost:5173

## Usage
This space we have created, can be use as a template or final site for your own online shop. With an elegant and sweet aesthetic featuring minimalist lines, it is the perfect place to showcase products from the world of baking and related items in a visually appealing way. In addition, it is structured to create a solid relationship between the shop and the user, based on its database, order management, and product management.

## Tech stack
### Core technologies
- **JavaScript (ES6+)** – Main development language for logic and interactivity
- **CSS3** – Styling across all components and pages
- **HTML5** – Single entry point (“index.html”) used to include all CSS files and load the JS app via module script
- **Vanilla JavaScript** – No frameworks; DOM manipulation and logic handled manually

### Development environment & tools
- **Git + GitHub** – Version control with a collaborative workflow using forks, branches, commits, and PRs
- **Visual Studio Code** – Main IDE used for all development
- **Vite** – Local development server and bundler for fast reload and modular JS support
  - Naming convention: `featureName/task-T1-v01`, incrementing version as needed

### Libraries & external dependencies
- **Toastify** – Custom non-blocking notifications for success, warnings, and errors
- **EmailJS** – Integration for sending emails from the contact form without a backend
- **Nodemailer** – Confirmation emails for guest purchases, handled by this external backend library.
- **Cloudinary** – Used to securely upload and store product images. Admins upload images from their device, and Cloudinary returns a secure URL for display and storage.

### APIs & integration
- **DummyJSON** – Used for simulating payment functionality
- **API Bakery** – A custom backend API developed from scratch to handle orders and email confirmations for guest users. The server was version-controlled via GitHub and automatically deployed on Railway through continuous integration. The API is publicly available and consumed by the frontend for processing and storing order data.

### Design & planning tools
- **Trello** – For task assignment, project tracking, and team collaboration
- **Penpot** – For prototyping and designing the website's UI/UX

## API endpoints

### DummyJSON – Payment simulation (Fake API)

**Base URL:** “https://dummyjson.com”

| Method | Endpoint         | Description                        |
|--------|------------------|------------------------------------|
| POST   | `/posts/add`     | Simulates saving order/payment data (non-persistent) |

*Note: DummyJSON is a fake API used for front-end testing.  
Data submitted through this endpoint is not stored on a real server. However, the app logs submitted payment data to the console for validation during the simulation.

### Dummie Bakery API

**Base URL:** `https://api-bakery-production.up.railway.app`

| Method | Endpoint                   | Description                                                  |
|--------|----------------------------|--------------------------------------------------------------|
| GET    | `/blog`                    | Get all blog posts                                           |
| POST   | `/blog`                    | Create a new blog post                                       |
| PUT    | `/blog/:id`                | Edit an existing blog post                                   |
| DELETE | `/blog/:id`                | Delete a blog post                                           |
| GET    | `/email/confirmaciones`    | Get list of failed/successful guest email confirmations      |
| POST   | `/email/reintentar/:id`    | Retry sending confirmation email for a failed order          |
| DELETE | `/email/:id`               | Delete a confirmation email record                           |
| GET    | `/newsletters`             | Retrieve all newsletter subscribers                          |
| POST   | `/newsletters`             | Subscribe a new user to the newsletter                       |
| GET    | `/orders`                  | Get all orders (daily and pre-orders)                        |
| PATCH  | `/orders/:id`              | Update order status (e.g., pending, processing, delivered)   |
| GET    | `/productos`               | Get all products, with optional filters by name/category     |
| DELETE | `/productos/:id`           | Delete a product by ID                                       |
| PUT    | `/productos/:id`           | Update an existing product                                   |
| GET    | `/users`                   | Get all registered users                                     |
| DELETE | `/users/:id`               | Delete a user by ID                                          |

## Project structure

The project is structured in a modular and organized way, following clear separation of concerns. The /src directory contains the main logic and views of the website, while the root includes the entry point and configuration files.

<pre lang="markdown">

proyecto-grupo1-final/
│
├── node_modules/
│
├── public/
│
├── src/
│ ├── api/
│ │ ├── apiNewsletter.js
│ │ ├── apiPayment.js
│ │ └── apiUsers.js
│ │
│ ├── assets/
│ │ ├── images/
│ │ │ └── avatar/ # Avatars used in user profiles
│ │ │ └── ... # Icons, hero images, logos, etc.
│ │ ├── styles/ # CSS files (one per view or layout section)
│ │ │ ├── admin.css
│ │ │ ├── bio.css
│ │ │ ├── blog.css
│ │ │ ├── categorys.css
│ │ │ ├── contact.css
│ │ │ ├── filteredsearch.css
│ │ │ ├── footer.css
│ │ │ ├── front-admin.css
│ │ │ ├── hero.css
│ │ │ ├── login.css
│ │ │ ├── main.css
│ │ │ ├── modal&overlay.css
│ │ │ ├── navbar.css
│ │ │ ├── newsletter.css
│ │ │ ├── orders.css
│ │ │ ├── payment.css
│ │ │ ├── productsDetails.css
│ │ │ ├── profile.css
│ │ │ ├── reset.css
│ │ │ ├── shop.css
│ │ │ ├── shoppingCart.css
│ │ │ ├── signup.css
│ │ │ └──   variables.css
│ │
│ ├── components/
│ │ ├── footer.js
│ │ └── navbar.js
│ │
│ ├── interfaz-admin/
│ │ ├── front-blog.js
│ │ ├── front-confirmacionesEmail.js
│ │ ├── front-pedidos.js
│ │ ├── front-productos.js
│ │ └── front-usuario.js
│ │
│ ├── legal/
│ │ ├── legal-notice.js
│ │ ├── policy-cookies.js
│ │ ├── privacy-policy.js
│ │ └── sales-conditions.js
│ │
│ ├── utils/
│ │ ├── email.js
│ │ ├── modal&overlay.js
│ │ ├── paginacion.js
│ │ ├── toastify.js
│ │ └── validations.js
│ │
│ ├── views/
│ │ ├── admin.js
│ │ ├── bio.js
│ │ ├── blog.js
│ │ ├── categorys.js
│ │ ├── contact.js
│ │ ├── hero.js
│ │ ├── home.js
│ │ ├── login.js
│ │ ├── orders.js
│ │ ├── payment.js
│ │ ├── productsDetails.js
│ │ ├── profile.js
│ │ ├── shop.js
│ │ ├── shoppingCart.js
│ │ └── signup.js
│ │
│ ├── main.js # Entry point for app initialization and routing
│ ├── newsletterform.js # Handles newsletter form logic and email integration
│ └── router.js # Routing logic for SPA navigation
│
├── .gitignore
├── index.html # Main HTML file linking all CSS and initializing app
├── LICENSE #License information for this project
├── package-lock.json
└── package.json

 </pre>

## Contributors log

### Week 1 (July 11–18)
During the first week, the team conducted an initial brainstorming session and decided on the overall theme and concept of the project. Key elements were defined, such as the site's aesthetic, color palette, and visual style, along with the organization tool: Trello, to manage and assign tasks.
In addition, the team agreed to hold a short daily meeting each morning before starting work. These meetings were used to review individual progress, select new tasks, and make project decisions based on the previous day's outcomes. All updates from the daily meetings were documented in TRELLO and are summarized in this "week by week" section.
The project structure was outlined, including necessary pages and features, and the first technical decisions were made regarding routing, login, signup, and navigation bar. Initial exploration and testing of different APIs began, especially for managing users, products, and the payment gateway. Additionally, all product images were carefully selected using “Unsplash” and “Freepik”, ensuring visual coherence and variety aligned with the intended product catalog and branding.
Basic validations were implemented, and the signup form was connected to the database. Work also started on the “Penpot” design for the mobile version, and the team reviewed the idea collectively before assigning initial tasks.

### Week 2 (July 21–27)
This week focused on building key views such as productsDetails, shoppingCart, contact, and the admin interface. Modal and overlay functionalities were added to the login and signup views, and the payment gateway was expanded to include calendar-based stock management. Components like the newsletter and footer were also integrated.
The team refined the “Penpot” wireframes, cleaned the codebase, and began consolidating fully working parts into the main GitHub repository. Styles were progressively applied to views like hero, blog, categories, and productDetails, while the navigation bar was improved with login/profile and cart integration.
User experience was enhanced with visual cues and alerts, stock limits were established, and work began on linking users and their orders through the APIs. Development continued on search filters, responsive adjustments, and organizing the base structure for all major views.

### Week 3 (July 28–31)
In the final week, all alerts were replaced with showToast, and the Toastify library was fully integrated. Final styling was applied to the payment gateway, and components like footer, contact, and blog were made responsive for different screen sizes.
Newsletter logic was added using localStorage, with its dedicated API file created.
Improvements were made to buttons and logic in shoppingCart.js and payment.js, including fixing quantity selectors, syncing cart icons, and maintaining the cart state even after logout.
Filter functions and legal links were completed, and the orders view was fully implemented with a responsive design.
Pagination logic was centralized into a reusable utility function, and final refinements were made to core components like profile.js, shop.js, email.js, and modal&overlay.css.
The last days focused on polishing user experience, fixing small visual issues, and preparing the README.md file to summarize the entire development process for final delivery.

## License
This project is licensed under the MIT License – see the LICENSE file for details.
