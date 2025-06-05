import { APIRequestContext, APIResponse, request } from '@playwright/test';
import { BrowserManagement } from '../../core/browser/browser-management';
const baseUrl = 'https://demoqa.com';
export class BookHelper {
    static async getRequestContext(passedContext?: APIRequestContext): Promise<{ context: APIRequestContext, shouldDispose: boolean }> {
        if (passedContext) return { context: passedContext, shouldDispose: false };
        if (BrowserManagement.request) return { context: BrowserManagement.request, shouldDispose: false };

        const context = await request.newContext();
        return { context, shouldDispose: true };
    }

    static async getAllBooks(reqContext?: APIRequestContext): Promise<APIResponse> {
        const { context, shouldDispose } = await this.getRequestContext(reqContext);
        const response = await context.get(`${baseUrl}/BookStore/v1/Books`);
        if (shouldDispose) await context.dispose();
        return response;
    }

    static async addBook(token: string, bookIsbn: string, userID: string, reqContext?: APIRequestContext): Promise<APIResponse> {
        const { context, shouldDispose } = await this.getRequestContext(reqContext);
        const response = await context.post(`${baseUrl}/BookStore/v1/Books`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data: {
                userId: userID,
                collectionOfIsbns: [{ isbn: bookIsbn }],
            },
        });
        if (shouldDispose) await context.dispose();
        return response;
    }

    static async deleteAllBooks(token: string, userID: string, reqContext?: APIRequestContext): Promise<APIResponse> {
        const { context, shouldDispose } = await this.getRequestContext(reqContext);
        const response = await context.delete(`${baseUrl}/BookStore/v1/Books?UserId=${userID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        if (shouldDispose) await context.dispose();
        return response;
    }

    static async getDetailBook(token: string, bookIsbn: string, reqContext?: APIRequestContext): Promise<APIResponse> {
        const { context, shouldDispose } = await this.getRequestContext(reqContext);
        const response = await context.get(`${baseUrl}/BookStore/v1/Book?ISBN=${bookIsbn}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (shouldDispose) await context.dispose();
        return response;
    }

    static async deleteBook(token: string, bookIsbn: string, userID: string, reqContext?: APIRequestContext): Promise<APIResponse> {
        const { context, shouldDispose } = await this.getRequestContext(reqContext);
        const response = await context.delete(`${baseUrl}/BookStore/v1/Book`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data: {
                isbn: bookIsbn,
                userId: userID,
            },
        });
        if (shouldDispose) await context.dispose();
        return response;
    }
}
