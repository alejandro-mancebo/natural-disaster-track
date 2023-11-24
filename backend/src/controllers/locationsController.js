import Location from '../models/location.model.js';
import User from '../models/user.model.js';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

const getAllLocations = async (request, response) => {
  const locations = await Location.find({});
  response.json(locations);
};


const createNewLocation = async (request, response) => {

  // Validate request data
  const error = validationResult(request);
  if (!error.isEmpty())
    response.status(400).json({ message: 'The information supplied is Incorrect' });

  // Get the user data from the body of the request 
  const { locationName, coordinates, category, description, userId } = request.body.objectAddress;

  // Start mongoose session to the transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    const foundUser = await User.findById({ _id: userId });

    // create new user with encrypted password
    const createNewLocation = new Location({
      locationName: locationName,
      category: category,
      description: description,
      coordinates: coordinates, //[longitude, latitude],
      userId: userId,
      username: foundUser.username
    });

    // Save the new user to the database
    await createNewLocation.save();

    // End transaction 
    await session.commitTransaction();

    // Set and send status to the client
    response.status(201).json({ location: createNewLocation.toObject({ getters: true }) });

  } catch (error) {

    // Abort transaction and send error message
    await session.abortTransaction();

    response.status(500).json({ message: error.message })

  } finally {

    // End the mongoose session
    session.endSession();
  }

};


const updateLocation = async (request, response) => {

  // const { _id, firstName, lastName, email, dayOfBirth } = request.body.user;
  // const filter = { _id: _id }
  // const user = {
  //   firstName: firstName,
  //   lastName: lastName,
  //   email: email,
  //   dayOfBirth: dayOfBirth,
  // }

  // try {
  //   await User.findByIdAndUpdate(filter, user);
  //   response.status(201).send({ message: 'success' });
  // } catch (error) {
  //   console.error('update user error:', error.message);
  // }

  response.json(response);
};


const deleteLocation = async (request, response) => {
  const id = request.params.id;
  try {
    await User.findByIdAndDelete(id);
    response.status(200).send({ message: 'success' });
  } catch (error) {
    console.error('delete user error:', error.message);
  }
  response.json({ "id": request.body.id });
};


const getLocation = async (request, response) => {
  // const id = request.params.id;
  // try {
  //   const foundUser = await User.findById(id);
  //   const dateDOB = new Date(foundUser.dayOfBirth).toLocaleDateString();
  //   const user = {
  //     firstName: foundUser.firstName,
  //     lastName: foundUser.lastName,
  //     email: foundUser.email,
  //     dayOfBirth: dateDOB,
  //     role: foundUser.role,
  //   }
  //   response.json(user);
  // } catch (error) {
  //   console.error(error.message);
  // }


  response.json({ "id": request.body.id });
};


export default {
  getAllLocations,
  createNewLocation,
  updateLocation,
  deleteLocation,
  getLocation
}