import { request } from '@playwright/test';
import { AccountHelper } from './helper/api/account-helper';
import { BookHelper } from './helper/api/book-helper';
import { baseUser } from './config/user-env';
import { config as loadDotenv } from 'dotenv';
// re‐read .env so process.env.BASE_USER_ID is up‐to‐date
loadDotenv();

async function globalTeardown() {
     const actualUserId = process.env.BASE_USER_ID!;
    console.log("Clean up data")

    const reqContext = await request.newContext();
    const tokenResponse = await AccountHelper.generateToken(
        baseUser.userName,
        baseUser.password,
        reqContext
    );
    const { token } = await tokenResponse.json();
    console.log("Newly ID:", actualUserId)
    await BookHelper.deleteAllBooks(token, actualUserId, reqContext);
    console.log(`✅ Successfully deleted all books of the ${baseUser.userName} user.`)
    await AccountHelper.deleteUser(token, actualUserId, reqContext);
    console.log(`✅ Successfully removed ${baseUser.userName} user from Book Store.`)

    // 7) Clean up
    await reqContext.dispose();
}

export default globalTeardown;
