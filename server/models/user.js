import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        default: null,
        trim: true,
        maxlength: 32,
    },
    email: {
        type: String,
        required: true,
        default: null,
        unique: true
    },
    hashedPassword: {
        type: String,
    },
    salt:String,
    role: {
        type: Number,
        default: 0
    },
    tokens: {
        type: mongoose.Schema.ObjectId,
        ref: "token"
    },
    accessToken:{
        type:String
    },
    profilePic:{
        type:String
    }
});

// userSchema
//   .virtual("password")
//   .set(function(password) {
//     this._password = password;
//     this.salt = uuidv4();
//     this.encry_password = this.securePassword(password);
//   })
//   .get(function() {
//     return this._password;
//   });

// userSchema.method = {
//   autheticate: function(plainpassword) {
//     return this.securePassword(plainpassword) === this.encry_password;
//   },

//   securePassword: function(plainpassword) {
//     if (!password) return "";
//     try {
//       return crypto
//         .createHmac("sha256", this.salt)
//         .update(plainpassword)
//         .digest("hex");
//     } catch (err) {
//       return "";
//     }
//   }
// };

const User = mongoose.model('user', userSchema);

export default User;