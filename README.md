# Automania - Where Passion Meets Performance!

We at Automania are just as passionate about cars as you are. Our platform is your favorite destination to showcase your prized possessions and connect with other car enthusiasts. Whether you want to buy or just share your car, Automania is here to make it happen.

## Table of Contents

1. [Overview](#overview)
2. [Demo](#demo)
3. [User Permissions](#user-permissions)
4. [Deployment](#deployment)
5. [Application Architecture](#application-architecture)
6. [Screenshots](#screenshots)
7. [License](#license)

## Overview

Automania offers a range of comprehensive features:

- **Browse**: Explore an extensive collection of automobiles.
- **Register/Login**: Users can log in to the system to access exclusive functionalities.
- **Add Cars**: Effortlessly add your vehicles with comprehensive descriptions and captivating images.
- **Edit/Delete**: Seamlessly manage your listings with options to modify or remove them as needed.
- **Image Upload**: Showcase your vehicles with high-quality images uploaded directly from your device.
- **Infinite Scroll**: Enjoy uninterrupted browsing with infinite scroll feature.
- **Responsive Design**: Experience Automania's seamless performance across all devices.

## Demo

Check out the live demo of Automania at [https://automania-app.vercel.app](https://automania-app.vercel.app/)

For a quick exploration, you can use the following demo accounts:

- **Demo User:**

  - Email: john@example.com
  - Password: 123456

## User Permissions

- **Not-Logged User:**

  - View all cars

- **Logged-In User (Not Owner):**

  - View all cars

- **Logged-In User (Owner):**

  - Edit and delete own cars

## Deployment

### Frontend Deployment

The React frontend of Automania is deployed on [Vercel](https://vercel.com/). Vercel serves the frontend to users and provides a seamless browsing experience.

## Application Architecture

The following application architecture diagram is generated using [dependency-cruiser](https://github.com/sverweij/dependency-cruiser). It visually represents the dependencies within the project.

Explore the live flow of the Automania App architecture by visiting the [Live Flow Page](https://todoryadkov.github.io/Automania_Live_Flow_Architecture/)

![app-architecture](https://github.com/TodorYadkov/Automania/assets/4013980/73a3a02a-127e-4ddf-9a11-949b2fc4ff70)

For a detailed analysis of dependencies, you can run dependency-cruiser in your project. To get started, visit the [dependency-cruiser on NPM](https://www.npmjs.com/package/dependency-cruiser)

## Screenshots

### Desktop

---

#### Home Page - Not Logged
![catalog-desktop-unlogged](https://github.com/TodorYadkov/Automania/assets/4013980/7ed8e3a7-6227-4da7-ae4b-1d389b7ec91e)

#### Login Page - Not Logged
![login-desktop](https://github.com/TodorYadkov/Automania/assets/4013980/9fd8b3e3-2fc1-4aed-adfe-c626ef447d83)
![login-desktop-errors](https://github.com/TodorYadkov/Automania/assets/4013980/bfcec10b-8b55-4a98-871b-682b07d9a63a)
![login-desktop-valid-hide-password](https://github.com/TodorYadkov/Automania/assets/4013980/d052cb7a-4338-46a3-aa79-ac9740dc188a)
![login-desktop-valid-show-password](https://github.com/TodorYadkov/Automania/assets/4013980/f19c6950-3978-47f3-bef9-8b1ab9f06d0c)

#### Home Page - Logged
![catalog-desktop-logged](https://github.com/TodorYadkov/Automania/assets/4013980/a8736cfb-21f7-4174-90b5-d84070bce246)

#### Add Car Page - Logged
![add-car-desktop](https://github.com/TodorYadkov/Automania/assets/4013980/1a87bc54-8a4b-4acb-817e-9a7235114cf4)
![add-car-desktop-error](https://github.com/TodorYadkov/Automania/assets/4013980/2c5bc0ff-29ef-4f95-8622-257cb07be554)
![add-car-desktop-correct](https://github.com/TodorYadkov/Automania/assets/4013980/7075ffea-f9fe-4141-adda-748afb2cf491)
![catalog-desktop-logged-with-own-car](https://github.com/TodorYadkov/Automania/assets/4013980/9d1a38e0-ef09-468e-854e-df8b57b9c281)

#### Home Page - Logged With Own Car
![catalog-desktop-logged-with-own-car-with-actions-menu](https://github.com/TodorYadkov/Automania/assets/4013980/16335046-bed3-4399-a7c2-a6d885879d10)

#### Edit Car Page - Logged
![edit-car-desktop](https://github.com/TodorYadkov/Automania/assets/4013980/718e376c-502f-464f-b61d-96ce19ce715f)
![catalog-desktop-logged-with-own-car-edited](https://github.com/TodorYadkov/Automania/assets/4013980/e5a42b5f-b184-45e8-bef1-b331ba1ba61a)


#### Delete Car - Logged With Own Car
![delete-car-prompt-desktop](https://github.com/TodorYadkov/Automania/assets/4013980/fc560c8e-5608-4082-86c5-d3e5a9a0b5c3)
![catalog-desktop-logged-with-own-car-delited](https://github.com/TodorYadkov/Automania/assets/4013980/c27be125-71cb-4fec-a59f-c820d8812d91)

#### Logout - Logged
![logout-prompt-desktop](https://github.com/TodorYadkov/Automania/assets/4013980/07ec3416-c6d7-4d86-8ed6-f1a74272a776)

#### Register Page - Not Logged
![register-desktop](https://github.com/TodorYadkov/Automania/assets/4013980/81dfa5e6-167b-4a9b-bcd2-b7294bbc1588)
![register-desktop-errors](https://github.com/TodorYadkov/Automania/assets/4013980/929df951-ca98-496f-8b88-ae786256528f)
![register-desktop-valid-hide-password](https://github.com/TodorYadkov/Automania/assets/4013980/74b05941-a76c-408f-a891-373a3a897488)
![register-desktop-valid-show-password](https://github.com/TodorYadkov/Automania/assets/4013980/dd5c931a-6731-47d8-a876-31eb0c7a5a66)


### Mobile

---

#### Home Page - Not Logged
![catalog-mobile-unlogged](https://github.com/TodorYadkov/Automania/assets/4013980/b0b992e1-89f7-4d58-b460-9e3f098c86fe)

#### Login Page - Not Logged
![login-mobile](https://github.com/TodorYadkov/Automania/assets/4013980/c2811216-43fd-432b-955b-98e491a170cd)
![login-mobile-errors](https://github.com/TodorYadkov/Automania/assets/4013980/cc8ae311-448e-4e0f-ade3-b1016de9a718)
![login-mobile-valid-hide-password](https://github.com/TodorYadkov/Automania/assets/4013980/38ed9982-b067-421c-9ed5-884136fe8719)
![login-mobile-valid-show-password](https://github.com/TodorYadkov/Automania/assets/4013980/09f37932-af8e-40d4-9205-e68dabf1c436)

#### Home Page - Logged
![catalog-mobile-logged](https://github.com/TodorYadkov/Automania/assets/4013980/190a68f8-b561-4ee3-ab93-063de6ef06f1)

#### Add Car Page - Logged
![add-car-mobile](https://github.com/TodorYadkov/Automania/assets/4013980/b9453e4b-0972-4c27-9152-1fef3fc485ea)
![add-car-mobile-error](https://github.com/TodorYadkov/Automania/assets/4013980/22296716-5d5d-477a-b768-9d60006b4c88)
![add-car-mobile-correct](https://github.com/TodorYadkov/Automania/assets/4013980/870b65ae-9517-41d1-8e07-e046ef9aaa48)
![catalog-mobile-logged-with-own-car](https://github.com/TodorYadkov/Automania/assets/4013980/e439494e-ed69-46de-994f-15bca35cb6fc)

#### Home Page - Logged With Own Car
![catalog-mobile-logged-with-own-car-with-actions-menu](https://github.com/TodorYadkov/Automania/assets/4013980/f9381d36-82ca-40ea-9528-9fd8e77901c2)

#### Edit Car Page - Logged
![edit-car-mobile](https://github.com/TodorYadkov/Automania/assets/4013980/00b4ec71-8dc1-4cda-afda-f609509d9705)
![catalog-mobile-logged-with-own-car-edited](https://github.com/TodorYadkov/Automania/assets/4013980/f691bff1-acae-45a9-b8b9-3794fbd49bd1)

#### Delete Car - Logged With Own Car
![delete-car-prompt-mobile](https://github.com/TodorYadkov/Automania/assets/4013980/5c62b347-1146-4415-bc4a-440ac20714cd)
![catalog-mobile-logged-with-own-car-delited](https://github.com/TodorYadkov/Automania/assets/4013980/7b3b01e6-494e-4653-adc4-6909b2291cc1)

#### Logout - Logged
![logout-prompt-mobile](https://github.com/TodorYadkov/Automania/assets/4013980/db96a956-5780-4a0a-93db-64c86961ea6b)

#### Register Page - Not Logged
![register-mobile](https://github.com/TodorYadkov/Automania/assets/4013980/d50ca3df-c7b7-456c-9461-e510957d464e)
![register-mobile-errors](https://github.com/TodorYadkov/Automania/assets/4013980/5208d6ef-e919-41f4-9d35-b46d7acfaec0)
![register-mobile-valid-hide-password](https://github.com/TodorYadkov/Automania/assets/4013980/0c3021d2-5a55-4efb-be82-5c197bddfc0c)
![register-mobile-valid-show-password](https://github.com/TodorYadkov/Automania/assets/4013980/51467f2e-2b58-48d4-bda5-a2247d497698)

# License

This project is licensed under the MIT License
