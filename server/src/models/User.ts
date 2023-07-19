import mongoose from '../../database/database';

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  { collection: 'users' },
);

userSchema.index({ username: 1 }, { collation: { locale: 'pt', strength: 2 } });

const User = mongoose.model('User', userSchema);

export default User;
