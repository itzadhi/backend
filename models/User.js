import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    tempPassword: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Checks the enters password with stored hashed password by using bcrypt
userSchema.methods.matchPassword = async function (enterpassword) {
  return await bcrypt.compare(enterpassword, this.password);
};

//Before storing the password convert into hash
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
