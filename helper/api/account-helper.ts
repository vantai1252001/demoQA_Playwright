
import { APIRequestContext, request, APIResponse } from '@playwright/test';
import { BrowserManagement } from '../../core/browser/browser-management';
const baseUrl = 'https://demoqa.com/';
export class AccountHelper {
  static async generateToken(
    userName: string,
    password: string,
    reqContext?: APIRequestContext
  ): Promise<APIResponse> {
    let requestContext = reqContext ?? BrowserManagement.request ?? await request.newContext();
    const response = await requestContext.post(`${baseUrl}Account/v1/GenerateToken`, {
      data: { userName, password },
    });
    if (!reqContext && !BrowserManagement.request) await requestContext.dispose();
    return response;
  }
}
