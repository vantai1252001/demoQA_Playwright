import { request } from '@playwright/test';
import { AccountHelper } from './helper/api/account-helper';
import { baseUser } from './config/user-env';
import { JsonHelper } from './util/json-helper';

async function globalTeardown() {
    const userID = JsonHelper.readDataJson("userData.json").userID;
    console.log("🧹 Cleaning up data...");
    const reqContext = await request.newContext();
    const token = await AccountHelper.generateToken(
        baseUser.userName,
        baseUser.password,
        reqContext
    );
    const response = await AccountHelper.deleteUser(token, userID, reqContext);
    const statusResponse = response.status();
    console.log(`🔍 Status code: ${statusResponse}`);
    await reqContext.dispose();
}

export default globalTeardown;
