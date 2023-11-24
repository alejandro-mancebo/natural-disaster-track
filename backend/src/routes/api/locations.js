import { Router } from 'express';
import LocationsController from '../../controllers/locationsController.js';

const router = Router();

router.route('/')
  .get(LocationsController.getAllLocations)
  .post(LocationsController.createNewLocation)
  .put(LocationsController.updateLocation)


router.route('/:id')
  .delete(LocationsController.deleteLocation);

router.route('/:id')
  .get(LocationsController.getLocation);

export default router;