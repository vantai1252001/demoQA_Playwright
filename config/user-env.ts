import dotenv from 'dotenv';
dotenv.config();

export const baseUser = {
  userName: process.env.BASE_USER_NAME!,
  password: process.env.BASE_USER_PASSWORD!,
  userId: process.env.BASE_USER_ID!,
};
