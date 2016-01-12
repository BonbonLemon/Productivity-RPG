# Phase 3: Notebooks and Tags (2 days)

## Rails
### Models
* TaskType

### Controllers
* Api::TaskTypesController (create, index, show)
* Api::RewardsController (create, destroy, index, show, update)

### Views
* tasktypes/index.json.jbuilder
* tasktypes/show.json.jbuilder
* rewards/index.json.jbuilder
* rewards/show.json.jbuilder

## Flux
### Views (React Components)
* TaskTypesIndex
  - TaskTypeIndexItem
* TaskTypeForm
* SearchIndex

* RewardsIndex
  - RewardsIndexItem
* RewardForm

### Stores
* TaskType
* Reward

### Actions
* ApiActions.receiveAllTaskTypes -> triggered by ApiUtil
* ApiActions.receiveSingleTaskType
* TaskTypeActions.fetchAllTaskTypes -> triggers ApiUtil
* TaskTypeActions.fetchSingleTaskType

* ApiActions.receiveAllRewards -> triggered by ApiUtil
* ApiActions.receiveSingleReward
* ApiActions.deleteReward
* RewardActions.fetchAllRewards -> triggers ApiUtil
* RewardActions.fetchSingleReward
* RewardActions.createReward
* RewardActions.editReward
* RewardActions.destroyReward

### ApiUtil
* ApiUtil.fetchAllTaskTypes
* ApiUtil.fetchSingleTaskType

* ApiUtil.fetchAllRewards
* ApiUtil.fetchSingleReward
* ApiUtil.createReward
* ApiUtil.editReward
* ApiUtil.destroyReward

## Gems/Libraries
