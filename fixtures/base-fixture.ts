
import { test as baseTest, expect as baseExpect } from '../core/fixture/base-fixture';
import { LoginPage } from '../page-object/login-page';
import { ProfilePage } from '../page-object/profile-page';
import { BookStorePage } from '../page-object/book-store-page';

export const test = baseTest.extend<{
    loginPage: LoginPage;
    profilePage: ProfilePage;
    bookStorePage: BookStorePage;
}>({
    loginPage: async ({ }, use) => {
        await use(new LoginPage());
    },
    profilePage: async ({ }, use) => {
        await use(new ProfilePage());
    },
    bookStorePage: async ({ }, use) => {
        await use(new BookStorePage());
    }
});
export const expect = baseExpect;