import { BadRequestException, Injectable } from '@nestjs/common';
import _ = require('lodash');
import { omit } from 'lodash';
import { Response } from 'express';

@Injectable()
export class BaseResponseDto<T> {
  private success: boolean = false;
  private error: Error = null;
  private data: T = null;
  private withoutType: any = null;

  successExec(data: T) {
    this.success = true;
    this.data = data;
  }

  successExecWithoutType(data: any) {
    this.success = true;
    this.withoutType = data;
  }

  errorExec(error: Error) {
    this.success = false;
    this.error = new BadRequestException(
      error?.message ? error?.message : error,
    );
  }

  disposeResponse(response: Response = null): any {
    const responseBody = {
      success: this.success,
      error: this.error,
      data: this.data,
      content: this.withoutType,
    };

    const result = this.data
      ? omit(responseBody, ['content', 'error'])
      : this.withoutType
        ? omit(responseBody, ['data', 'error'])
        : _.update(omit(responseBody, ['data', 'content']), ['error'], () =>
            this.error ? this.error.message : this.error,
          );
    if (this.error) {
      if (response) {
        return response
          .status(this.error['response']['statusCode'])
          .send(this.error['response'] ? this.error['response'] : this.error);
      }

      return this.error['response'];
    }

    if (response) {
      return response.send(result);
    }

    return result;
  }
}
