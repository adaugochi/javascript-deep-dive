const UserAvailabilityModel = require("../models/UserAvailabilityModel");
const AppointmentModel = require("../models/AppointmentModel");
const UserModel = require("../models/UserModel");

const bookAppointment = async (userAvailabilityId, info) => {
  const { name, email, reason } = info;

  const userAvailability = await UserAvailabilityModel.findOne({
    _id: userAvailabilityId,
    status: "pending",
  });

  //const { userId } = userAvailability;

  if (!userAvailability) {
    throw new Error("This user isn't available for booking");
  }

  const { userId } = userAvailability;

  let newAppointment = await AppointmentModel.create({
    userId,
    userAvailabilityId,
    name,
    email,
    reason,
  });

  userAvailability.status = "booked";
  await userAvailability.save();

  if (!newAppointment) {
    throw new Error("Appointment not scheduled successfully");
  }

  return "Appointment booked successfully!!!";
};

const scheduledAppointments = async (params) => {
  const { userId } = params;
  // check if the user exists in the database
  const user = await UserModel.findById({ _id: userId });

  // if user does not exist in the database throw new error
  if (!user) {
    throw new Error("User is not available");
  }

  // Getting all the scheduledAppointments of the user
  const appointment = await AppointmentModel.find({ userId: userId }).populate(
    "userId",
    "name email"
  );

  // if there are no scheduled appointments for the user throw an error
  if (!appointment) {
    throw new Error("No scheduled appointments for this user");
  }

  return appointment;
};

module.exports = {
  bookAppointment,
  scheduledAppointments,
};
