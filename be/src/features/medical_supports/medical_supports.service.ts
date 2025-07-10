import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMedicalSupportDto, CreateMultipleMedicalSupportDto } from './dto/create-medical_support.dto';
import { UpdateMedicalSupportDto } from './dto/update-medical_support.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalSupport } from './entities/medical_support.entity';
import { IMedicalSupportDetailDto } from 'src/common/types/medical-support.interface';
import { plainToInstance } from 'class-transformer';
import { MedicalSupportDtoDetailDto } from './dto/medical-support-response.dto';

@Injectable()
export class MedicalSupportsService {
  constructor(
    @InjectRepository(MedicalSupport)
    private medicalSupportRepository: Repository<MedicalSupport>,
  ) { }

  async createMultipleMedicalSupports(
    createMedicalSupportDto: CreateMultipleMedicalSupportDto[],
    initial_responses_id: string,
    manager: EntityManager,
  ) {
    try {
      const medicalSupports = createMedicalSupportDto.map((dto) => ({
        ...dto,
        initial_responses_id,
      }));

      await manager.insert(MedicalSupport, medicalSupports);
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(
        'Failed to create Medical Support items',
        error.message,
      );
    }
  }

  async findMedicalSupports() {
    return await this.medicalSupportRepository.find()
  }

  async findMedicalSupportById(id: string): Promise<IMedicalSupportDetailDto> {
    try {
      const medicalSupport = await this.medicalSupportRepository.findOne({
        where: {
          medical_supports_id: id,
          is_deleted: false
        }
      })

      if (!medicalSupport) {
        throw new NotFoundException(`Medical support with ID ${id} not found`)
      }

      return plainToInstance(MedicalSupportDtoDetailDto, medicalSupport, { excludeExtraneousValues: true });
    } catch (error) {
      throw error
    }
  }

  async updateMedicalSupport(
    id: string,
    updateMedicalSupportDto: UpdateMedicalSupportDto,
  ): Promise<IMedicalSupportDetailDto> {
    try {
      const medicalSupport = await this.medicalSupportRepository.findOne({
        where: {
          medical_supports_id: id,
          is_deleted: false,
        },
      });

      if (!medicalSupport) {
        throw new NotFoundException(`Medical support with ID ${id} not found`);
      }

      Object.assign(medicalSupport, updateMedicalSupportDto);
      const savedMedicalSupport = await this.medicalSupportRepository.save(medicalSupport);

      return plainToInstance(MedicalSupportDtoDetailDto, savedMedicalSupport, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async createMedicalSupport(dto: CreateMedicalSupportDto): Promise<IMedicalSupportDetailDto> {
    try {
      const newSupport = this.medicalSupportRepository.create(dto);
      const savedSupport = await this.medicalSupportRepository.save(newSupport);
      return plainToInstance(MedicalSupportDtoDetailDto, savedSupport, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error;
    }
  }



  async removeMedicalSupport(id: string): Promise<{ is_deleted: boolean }> {
    try {
      const medicalSupport = await this.medicalSupportRepository.findOne({
        where: {
          medical_supports_id: id,
          is_deleted: false,
        },
      });

      if (!medicalSupport) {
        throw new NotFoundException(`Medical support with ID ${id} not found`);
      }

      medicalSupport.is_deleted = true;
      await this.medicalSupportRepository.save(medicalSupport);

      return {
        is_deleted: medicalSupport.is_deleted
      };
    } catch (error) {
      throw error;
    }
  }
}
