import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { userEntity } from "./entity/user.entity";
import { Repository } from "typeorm";
import { createUserDTO } from "./dto/user.dto";
import * as bcrypt from 'bcrypt';
import { updateUserDTO } from "./dto/userUpdate.dto";

@Injectable()
export class userService {

    constructor(
        @InjectRepository(userEntity)
        private userRepository: Repository<userEntity>
    ) {}

    async create(createUserDTO: createUserDTO) {
            if(
                await this.userRepository.exists({
                    where: {email: createUserDTO.email}
                })
            ) {
                throw new BadRequestException('Email ja existe')
            }

            createUserDTO.password = createUserDTO.password

            const salt = await bcrypt.genSalt()

            createUserDTO.password = await bcrypt.hash(createUserDTO.password, salt)

            const user = this.userRepository.create(createUserDTO)

            return this.userRepository.save(user)
    }

    async read() {
        return await this.userRepository.find()
    }

    async readOne(id: number) {
        
        const user = await this.userRepository.findOne({where: {id: id}})
        
        if(!user){
            throw new BadRequestException('Usuario não existe')
        }

        return user
    }

    async deleteOne(id: number) {
        if(!(await this.userRepository.findOne({where: {id: id}}))) {
            throw new NotFoundException('Usuario não existe')
        }

        await this.userRepository.delete(id)

    }

    async updateUser(id: number, {email, password, name}: updateUserDTO){
        if(!(await this.userRepository.exists({where: {id: id}}))) {
            throw new NotFoundException('Usuario não existe')
        }

        const user: any = {}

        if(email) {
            user.email = email
        }
        
        if(password) {

            const salt = await bcrypt.genSalt()

            password = await bcrypt.hash(password, salt)

            user.password = password
        }
        
        if(name) {
            user.name = name
        }

        await this.userRepository.update(id, user)

    }
}