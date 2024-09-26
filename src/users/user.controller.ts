import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Req, Request, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { userService } from "./user.service";
import { createUserDTO } from "./dto/user.dto";
import { AuthGuard } from "../guard/auth.guard/auth.guard";
import { updateUserDTO } from "./dto/userUpdate.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import {mkdir, writeFile} from 'fs/promises'
import { join } from "path";

@Controller('users')
export class userController {

constructor(private readonly userService: userService) {}

@UseGuards(AuthGuard)
@Post()
create(@Body() createUserDTO: createUserDTO) {
    return this.userService.create(createUserDTO)
}

@UseGuards(AuthGuard)
@Get()
list() {
    
    return this.userService.read()
}

@UseGuards(AuthGuard)
@Get(':id')
listOne(@Param('id') id:number) {
    
    return this.userService.readOne(id)

}

@UseGuards(AuthGuard)
@Delete(':id')
deleteOne(@Param('id') id: number) {
    return this.userService.deleteOne(id)
}

@UseGuards(AuthGuard)
@Patch(':id')
updateOne(@Param('id') id: number, @Body() dados: updateUserDTO) {

    return this.userService.updateUser(id, dados)
}

@UseGuards(AuthGuard)
@UseInterceptors(FileInterceptor('file'))
@Post('photo')
async uploadPhoto(
    @UploadedFile(new ParseFilePipe({
        validators: [
            new FileTypeValidator({ fileType: 'image/png' }),
            new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 })
        ]
    })) photo: Express.Multer.File
) {

    await mkdir(join(__dirname, '..', 'storage', 'photos'), { recursive: true });
    let photoName: string;

    try {
        const extension = photo.mimetype.split('/')[1];
        photoName = `photo-user.${extension}`;
        await writeFile(join(__dirname, '..', 'storage', 'photos', photoName), photo.buffer);
    } catch (e) {
        throw new UnauthorizedException(e);
    }

    return { success: true, fileUrl: `http://localhost:3000/storage/photos/${photoName}` };
}

@UseGuards(AuthGuard)
@Get('user/photos')
photo() {
    return {sucess: 'http://localhost:3000/storage/photos/photo-user.png'}
}

}
