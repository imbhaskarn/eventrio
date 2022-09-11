# Eventrio-api
> Nodejs, express, async, sequelizer, bcrypt

```
 .
├──  __test__
│  └──  handlers.test.js
├──  dir_structure.md
├──  docker-compose.yml
├──  Dockerfile
├──  jest.config.js
├──  package-lock.json
├──  package.json
├──  Procfile
├──  README.md
├──  rest.http
├──  server.js
└──  src
   ├──  app.js
   ├──  config
   │  └──  config.js
   ├──  controllers
   │  ├──  serviceController.js
   │  ├──  subServiceController.js
   │  ├──  testController.js
   │  └──  userController.js
   ├──  db
   │  ├──  migrations
   │  │  ├──  20220817203011-create-user.js
   │  │  ├──  20220818062637-create-user-contact-mobile.js
   │  │  ├──  20220818094710-create-user-contact-email.js
   │  │  ├──  20220818100358-create-user-resource.js
   │  │  ├──  20220818120843-create-user-detail.js
   │  │  ├──  20220823125347-create-service.js
   │  │  ├──  20220823130709-create-sub-service.js
   │  │  ├──  20220825040026-create-service-type.js
   │  │  ├──  20220825121906-add_cols_to_service_table.js
   │  │  ├──  20220825170705-create-service-gallary.js
   │  │  ├──  20220826133711-add_address_location_cols_to_service_table.js
   │  │  ├──  20220828061111-add_gender_date_of_birth_city_cols_in_user_model.js
   │  │  ├──  20220828065011-rm_user_details_user_mobiles_user_email_table.js
   │  │  ├──  20220828071833-add_name_email_mobile_cols_to_users_table.js
   │  │  └──  20220828135546-change_service_type_cols_in_services.js
   │  └──  seeders
   │     ├──  20220806054439-user_data.js
   │     ├──  20220823130001-add_service.js
   │     ├──  20220823131648-add_sub_service.js
   │     ├──  20220825130832-add_service_type.js
   │     └──  20220825172254-add_service_gallary.js
   ├──  helpers
   │  ├──  is-phone
   │  │  └──  index.js
   │  ├──  otp-generator
   │  │  └──  index.js
   │  ├──  phoneCheckFmt.js
   │  ├──  sendEmail.js
   │  ├──  sendOTP.js
   │  └──  validation
   │     ├──  joiValidation.js
   │     └──  validateToken.js
   ├──  models
   │  ├──  index.js
   │  ├──  service.js
   │  ├──  service_gallary.js
   │  ├──  service_type.js
   │  ├──  sub_service.js
   │  ├──  user.js
   │  └──  user_resource.js
   ├──  public
   │  └──  views
   │     └──  otpemail.ejs
   └──  routes
      └──  user.routes.js
```
