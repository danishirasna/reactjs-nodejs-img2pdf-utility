import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const validationOptions: ValidatorOptions = {
      validationError: { target: false, value: false },
    };

    const validationErrors = await validate(object, validationOptions);
    const errors = this.flattenValidationErrors(validationErrors);

    if (validationErrors.length > 0) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Validation Error',
          message: errors,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private flattenValidationErrors(
    validationErrors: ValidationError[],
  ): string[] {
    const errors = [];
    for (const error of validationErrors) {
      if (error.constraints) {
        errors.push(...Object.values(error.constraints));
      }
      if (error.children && error.children.length) {
        errors.push(...this.flattenValidationErrors(error.children));
      }
    }
    return errors;
  }
}
