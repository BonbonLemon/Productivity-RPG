# ProductivityRPG

[Heroku link][heroku]

[heroku]: http://www.productivity-rpg.xyz/

## Minimum Viable Product

ProductivityRPG is a web application inspired by Habitica built using Ruby on Rails and React.js. ProductivityRPG allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create, read, edit, and delete/complete tasks which yield money
- [ ] Organize tasks into categories (to-dos, dailies, habits)
- [ ] Customize personal avatar
- [ ] Buy and change equipment for personal avatar through rewards
- [ ] Search for other users and add friends
- [ ] Send battle requests to other users

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, and Task, Avatar, Rewards, and Equipment Model and JSON API (2 days)

In Phase 1, I will begin by implementing user signup and authentication (using
BCrypt). There will be a basic landing page after signup that will contain the
container for the application's root React component. Before building out the
front end, I will begin by setting up a full JSON API for the different models
along with a basic skeleton profile page containing simple elements.

[Details][phase-one]

### Phase 2: Flux Architecture and Note CRUD (2.5 days)

Phase 2 is focused on setting up Flux, the React Router, and the React view
structure for the main application. Potentially, I will create task-types such
as "to-dos," "dailies," or "habits," but to start, I will just have a general
"task." After the basic Flux architecture has been set up, a Task store will be
implemented and a set of actions corresponding to the needed CRUD functionality
created. Once this is done, I will create React views for the Tasks `Index`,
`IndexItem` and `Form`. At the end of Phase 2, Tasks can be created, read,
edited and destroyed in the browser.

[Details][phase-two]

### Phase 3: Task Types and Rewards (1.5 days)

Phase 3 adds organization to the Tasks. Tasks belong to a TaskType, which has
its own `Index` view. Create JSON API for TaskType. Will then create the Rewards
section, which will be very similar to just another TaskType. Will also add
Rewards, which will be very similar to a task. Potentially, Rewards will yield
things such as Equipment, but to start, will make Rewards simply yield text such
as "30m of video games." Will add equipment during a different phase.

[Details][phase-three]

### Phase 4: Equipment and updates to Avatar (0.5 days)

Phase 4 will allow a user to spend money gained from completing tasks on Rewards
which yield equipment that customizes the user's Avatar. Buying an equipment
will change its cost to 0.

[Details][phase-four]

### Phase 5: User Search (and battle?) (1 day)

Phase 5 introduces a User Search feature which will have an auto-complete
feature. This will allow users to view other users' avatars and then add them
as friends. Will also have to create a view for a user's friends. Depending on
how much time this first part takes, will possibly create a fairly simple battle
feature.

[Details][phase-five]

### Phase 6: Styling Cleanup and Seeding (1 day)

Phase 6 I will add styling flourishes

### Bonus Features (TBD)
- [ ] Prettify avatar and equipment
- [ ] Avatar attributes (health, level, experience) and Battle feature
- [ ] Group page/tasks

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
