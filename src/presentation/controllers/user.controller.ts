import {
  BadRequestException,
  Controller,
  NotFoundException,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as PDFDocument from 'pdfkit';
import { Errors } from '../enums';

@ApiTags('File Management')
@Controller('api/file')
export class UserController {
  constructor() {}
  private readonly allowedExtensions = ['.jpeg', '.jpg', '.png'];

  validateFileExtension(filename: string) {
    const extension = filename.slice(filename.lastIndexOf('.'));
    if (!this.allowedExtensions.includes(extension.toLowerCase())) {
      throw new BadRequestException('Unsupported file type.');
    }
  }

  /**
   * Creates a new user in the system.
   * This endpoint allows for the creation of a new user by submitting user details. It includes validations to ensure that the
   * provided data meets the required format and that the username does not already exist in the system. If a duplicate username is
   * found, a NotFoundException is thrown. The function is restricted to users with SUPERADMIN or ADMIN roles through role-based
   * access control, ensuring that only authorized personnel can perform this operation. The creation process captures who created the
   * user for auditing purposes.
   *
   * @param {any} authUser - The authenticated user object, used to identify the user creating the new account.
   * @param {CreateUserDto} createUserDto - Data transfer object containing the user details for the new user.
   * @param {Response} response - Express's response object used for sending HTTP responses.
   * @returns {Promise<User>} - A promise that resolves with the newly created User object if successful,
   *                            or rejects with an error if there is an issue during the user creation process.
   * @throws {NotFoundException} - Thrown if the username already exists to ensure unique usernames in the system.
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ): Promise<any> {
    try {
      if (!file) {
        return new NotFoundException(Errors.FILE_NOT_FOUND);
      }
      this.validateFileExtension(file.originalname);

      const doc = new PDFDocument({ margin: 50 }); // Create a document with margins

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');

      doc.pipe(res);

      const imageStream = Buffer.from(file.buffer);

      // Calculate fit dimensions
      const pageWidth =
        doc.page.width - doc.page.margins.left - doc.page.margins.right;
      const pageHeight =
        doc.page.height - doc.page.margins.top - doc.page.margins.bottom;

      doc.image(imageStream, {
        fit: [pageWidth, pageHeight],
        align: 'center',
        valign: 'center',
      });

      doc.end();
    } catch (error) {
      return new NotFoundException(Errors.INTERNAL_SERVER_ERROR);
    }
  }
}
