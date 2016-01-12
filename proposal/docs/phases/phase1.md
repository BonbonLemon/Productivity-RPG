# Phase 1: User Authentication, Note Model and JSON API

## Rails
### Models
* User
* Task
* Avatar
* Rewards

### Controllers
* UsersController (create, new)
* SessionsController (create, new, destroy)
* Api::TasksController (create, destroy, index, show, update)
* Api::AvatarsController (create, show)

### Views
* users/new.html.erb
* session/new.html.erb
* tasks/index.json.jbuilder
* tasks/show.json.jbuilder
* avatars/show.json.jbuilder
* rewards/index.json.jbuilder
* rewards/show.json.jbuilder

## Flux
### Views (React Components)

### Stores

### Actions

### ApiUtil

## Gems/Libraries
* BCrypt (Gem)
