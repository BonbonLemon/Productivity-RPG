# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151215220501) do

  create_table "task_types", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.string   "type_name",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "task_types", ["user_id"], name: "index_task_types_on_user_id"

  create_table "tasks", force: :cascade do |t|
    t.integer  "type_id",      null: false
    t.string   "title",        null: false
    t.integer  "money_reward", null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "tasks", ["type_id"], name: "index_tasks_on_type_id"

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true
  add_index "users", ["username"], name: "index_users_on_username", unique: true

end