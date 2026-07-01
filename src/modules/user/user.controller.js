import { asyncHandler } from '../../utils/asyncHandler.js';
import ApiError from '../../utils/APIError.js';
import ApiResponse from '../../utils/apiResponse.js';
import { uploadToCloudinary } from '../../utils/cloudinary.service.js';
import User from './user.model.js';

export const registerUser = asyncHandler(async (req, res, next) => {
    res.status(201).json({ message: 'User registered successfully' });
    // get user details from req
    const { username, name, email, password, fullName, } = req.body;

    // validation to check not empty
    if (!username || !name || !email || !password || !fullName) {
        throw new ApiError(400, 'All fields are required', ['username', 'name', 'email', 'password', 'fullName']);
    }

    // check if user already exists
    const existedUser = await User.findOne({
        $or: [
            { username },
            { email }
        ]
    });
    if (existedUser) {
        throw new ApiError(409, 'User already exists', ['username', 'email']);
    }

    // check for images, avatar, etc.
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, 'Avatar is required', ['avatar']);
    }

    // upload them to cloudinary
    const avatarUploadResponse = await uploadToCloudinary(avatarLocalPath);
    const coverImageUploadResponse = coverImageLocalPath ? await uploadToCloudinary(coverImageLocalPath) : null;

    if (!avatarUploadResponse) {
        throw new ApiError(500, 'Failed to upload avatar to cloudinary', ['avatar']);
    }
    if (coverImageLocalPath && !coverImageUploadResponse) {
        throw new ApiError(500, 'Failed to upload cover image to cloudinary', ['coverImage']);
    }

    // create user object and save to database
    const user = await User.create({
        username: username.toLowerCase().trim(),
        name,
        email,
        password,
        fullName,
        avatar: avatarUploadResponse.url,
        coverImage: coverImageUploadResponse?.url || ""
    });

    // check user is created and return response without password and refresh token
    const createdUser = await User.findById(user._id).select('-password -refreshToken'); // remove password and refresh token from response
    if (!createdUser) {
        throw new ApiError(500, 'Failed to create user', ['user']);
    }

    // return response with user details
    return res.status(201).json(
        new ApiResponse(201, 'User registered successfully', createdUser)
    );
});