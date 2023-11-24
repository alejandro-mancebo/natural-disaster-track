import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../models/user.model.js';


const handleSignUp = async (request, response) => {

  // Validate request data
  const error = validationResult(request);
  if (!error.isEmpty())
    response.status(400).json({ message: 'The information supplied is Incorrect' });

  // Get the user data from the body of the request 
  const { username, email, password, role } = request.body.newUser;

  // Check for duplicate user email in the database
  const duplicateUser = await User.findOne({ username: username }).exec();
  if (duplicateUser)
    return response.sendStatus(409); //Conflict

  // Start mongoose session to the transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    // create new user with encrypted password
    const createNewUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      role: role,
    });

    // Save the new user to the database
    await createNewUser.save();

    // End transaction 
    await session.commitTransaction();

    // Set and send status to the client
    response.status(201).json({ user: createNewUser.toObject({ getters: true }) });

  } catch (error) {

    // Abort transaction and send error message
    await session.abortTransaction();

    response.status(500).json({ 'message': error.message })

  } finally {

    // End the mongoose session
    session.endSession();
  }
}

export default { handleSignUp };