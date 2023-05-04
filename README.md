## Description

As part of this weekly challenge, we were asked to create a blog with which development enthusiasts could share their thoughts and continue conversation on latest dev trends and technologies. I built this application in accordance with the Model View Controller (MVC) design pattern.

## Usage

Below you will find a link to the deployed application:

https://boiling-wave-62937.herokuapp.com/

To use interact with the application, navigate to the "Home" page to view all posts to the dev blog 

If you wish to create posts of your own and add comments to previously-existing posts, you'll need to log in. To do so, simply select "Login" from the navbar, from which you will find a link to sign up if you do not already have an account created.

Once logged in, navigate to the "Dashboard" view to add a new post. You will not see any posts in your dashboard view if you have not yet created a post. 

To comment on an existing post, you click on it from either the "Dashboard" view or the "Home" view.


## Credits

I created this blog in conjunction with the software development boot camp provided by the Georgia Tech professional development program.


## Features

The functionality of the development blog includes but is not limited to:

- Log-in option for existing users
- Sign-up option for new users
- Dashboard view from which to create new posts on latest technologies
- Option to modify posts that you as a user created
- Home page from which to view all posts to the blog
- Option to comment on other blog users' posts as well as your own


I leveraged ,among other technologies:
 - express package to handle server set-up, routes for my application pages, and routes for blog data
 - express-session package to save sessions and specific user data
 - sequelize for to establish and model relational database
 - built-in JavaScript Date() object for time stamping
 - bcrypt package to secure user password data