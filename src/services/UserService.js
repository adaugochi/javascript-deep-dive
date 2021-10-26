const UserModel = require("../models/UserModel");
const UserAvailabilityModel = require("../models/UserAvailabilityModel");
const UserRepository = require("../repositories/UserRepository")

const UserService = () => {
    const addUser = async (postRequestData) => {
        let newUser = new UserModel(postRequestData);
        if (!await newUser.save()) {
            throw new Error('User not saved')
        }
    }

    const setDate = async (username, date) => {
        const user = await UserRepository.findUserByUserName(username)
        if (!user) {
            throw new Error('Cannot perform this request')
        }

        let newDate = new UserAvailabilityModel({
            date: date,
            userId: user._id
        });
        await newDate.save()
    }

    const getAllPendingAppointments = async (username) => {
        const user = await UserRepository.findUserByUserName(username)
        if (!user) {
            throw new Error('Cannot perform this request')
        }
        const appointments = await UserRepository.getAllPendingUserAvailabity(user._id);
        return appointments;
        // const appointments = await UserAvailabilityModel.find({
        //     userId: user._id, status: 'pending'
        // });
        // return appointments;
    }

    return {
        addUser,
        setDate,
        getAllPendingAppointments
    }
}

module.exports = UserService