import { request } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { AccountHelper } from './helper/api/account-helper';
import { userData } from './test-data/user-data';
import { BookHelper } from './helper/api/book-helper';

async function globalTeardown() {
    // const reqContext = await request.newContext();
    // const tokenResponse = await AccountHelper.generateToken(
    //     userData.user1.userName,
    //     userData.user1.password,
    //     reqContext
    // );
    // const { token } = await tokenResponse.json();
    // await BookHelper.deleteAllBooks(token, userData.user1.userID)
}

export default globalTeardown;
