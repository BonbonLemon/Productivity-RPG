# Phase 4: Allow Complex Styling in Notes (1 day)

## Rails
### Models
* Equipment

### Controllers
* Api::EquipmentsController (create, destroy, show)

### Views
* equipments/show.json.jbuilder

## Flux
### Views (React Components)
* Equipment

### Stores
* Equipment

### Actions
* ApiActions.receiveAllEquipments -> triggered by ApiUtil
* ApiActions.receiveSingleEquipment
* EquipmentActions.fetchAllEquipments -> triggers ApiUtil
* EquipmentActions.fetchSingleEquipment

### ApiUtil
* ApiUtil.fetchAllEquipments
* ApiUtil.fetchSingleEquipment

## Gems/Libraries
