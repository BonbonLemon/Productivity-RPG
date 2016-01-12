# Schema Information

## avatar
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
money       | integer   | not null, default: 0

## task_types
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
type        | string    | not null

## tasks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
type_id     | integer   | not null, foreign key (references task_types), indexed
title       | string    | not null
money_reward| integer   | not null

## rewards
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
title       | string    | not null
cost        | integer   | not null
equipment_id| integer   | foreign key (references equipment), indexed

## equipments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | foreign key (references users), indexed
name        | string    | not null

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
