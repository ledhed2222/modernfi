# Requirements 
- You need Ruby version 3.3.0. I recommend using [rbenv](https://github.com/rbenv/rbenv) to install it.
- You need NodeJS. I tested/built this using version 22.2.0, but older versions __should__ work.
- You need PostgreSQL. I tested/built this using version 14, but later versions __should__ work.

# Installation:
- `bundle install`
- `cd client && npm install`
- Make sure PostgreSQL is running
- `bundle exec db:create`
- `bundle exec db:migrate`

# Running:

- Make sure PostgresSQL is running
- `bundle exec foreman start --procfile=Procfile.dev`

# TODOs:

- There are several styling/usability features that I'd want to fix/add. The tooltips on the SVG chart aren't always within the chart frame.
- There are no good user-facing error messages when the user does something wrong.
- There are no good user-facing error messages when the server encounters an error.

