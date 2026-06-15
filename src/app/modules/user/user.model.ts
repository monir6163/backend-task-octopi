import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser, UserModel } from './user.interface';

export enum UserRole {
   ORG_ADMIN = 'ORG_ADMIN',
   EMPLOYEE = 'EMPLOYEE',
}

const userSchema = new Schema(
   {
      organizationId: {
         type: Schema.Types.ObjectId,
         ref: 'Organization',
         required: true,
         index: true,
      },

      name: {
         type: String,
         required: true,
         trim: true,
      },

      email: {
         type: String,
         required: true,
         lowercase: true,
         trim: true,
      },

      password: {
         type: String,
         required: true,
         select: false,
      },

      role: {
         type: String,
         enum: Object.values(UserRole),
         default: UserRole.EMPLOYEE,
      },

      isActive: {
         type: Boolean,
         default: true,
      },
   },

   {
      timestamps: true,
      versionKey: false,
   }
);
userSchema.index(
   {
      organizationId: 1,
      email: 1,
   },
   {
      unique: true,
   }
);

userSchema.pre('save', function (next) {
   if (!this.isModified('password')) {
      return next();
   }
   this.password = bcrypt.hashSync(this.password, config.bcrypt_salt_rounds);
   next();
});

userSchema.methods.toJSON = function () {
   const userObject = this.toObject();
   delete userObject.password;
   delete userObject.refreshToken;
   return userObject;
};

export const User = model<IUser, UserModel>('User', userSchema);
