const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema =  new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true
    }
})

userSchema.pre('save', async function( next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
}
)

const User =  mongoose.model('User', userSchema);

module.exports = User;



// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDM2MmFhYTU1NWEwODE5ZjdmNjU2ZiIsInVzZXJuYW1lIjoiZGVlcGFuc2h1a3VtYXIyNTgwQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NTA1MjY2MCwiZXhwIjoxNzQ1MDU2MjYwfQ.BHCSh4O5ETrJdlY8vEPpDb6AKEgOpItxejuL38brdr4"