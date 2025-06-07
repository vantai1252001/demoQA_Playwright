
import { APIRequestContext, request, APIResponse } from '@playwright/test';
import { BrowserManagement } from '../../core/browser/browser-management';
const baseUrl = 'https://demoqa.com/';
export class AccountHelper {
  static async generateToken(
    userName: string,
    password: string,
    reqContext?: APIRequestContext
  ): Promise<string> {
    let requestContext = reqContext ?? BrowserManagement.request ?? await request.newContext();
    const response = await requestContext.post(`${baseUrl}Account/v1/GenerateToken`, {
      data: { userName, password },
    });
    const { token } = await response.json();
    if (!reqContext && !BrowserManagement.request) await requestContext.dispose();
    return token;
  }

  static async getListBooksByUserId(
    token: string,
    userID: string,
    reqContext?: APIRequestContext
  ): Promise<APIResponse> {
    let requestContext = reqContext ?? BrowserManagement.request ?? await request.newContext();
    const response = await requestContext.get(`${baseUrl}Account/v1/User/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!reqContext && !BrowserManagement.request) await requestContext.dispose();
    return response;
  }

  static async createUser(
    userName: string,
    password: string,
    reqContext?: APIRequestContext
  ): Promise<APIResponse> {
    let requestContext = reqContext ?? BrowserManagement.request ?? await request.newContext();
    const response = await requestContext.post(`${baseUrl}Account/v1/User`, {
      data: {
        userName: userName,
        password: password,
      },
    });
    if (!reqContext && !BrowserManagement.request) await requestContext.dispose();
    return response;
  }
  static async deleteUser(
    token: string,
    userId: string,
    reqContext?: APIRequestContext
  ): Promise<APIResponse> {
    let requestContext = reqContext ?? BrowserManagement.request ?? await request.newContext();
    const response = await requestContext.delete(`${baseUrl}Account/v1/User/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!reqContext && !BrowserManagement.request) await requestContext.dispose();
    return response;
  }
}
