# SAFCSP PROJECT USING Laravel & ReactJS

#### How to install the project
  - Clone the project
  - setup database information in .env

#### commands to migrate the project database & seed the database with fake data:
```sh
php artisan migrate
php artisan passport:install 
php artisan module:seed Core
php artisan module:seed User
php artisan module:seed Reports
```

### run the application
```sh
php artisan serve
```

Then Navigate to your http://127.0.0.1:8000 in your browser.


### Live Demo for this project:
https://safcsp.next-apps.com