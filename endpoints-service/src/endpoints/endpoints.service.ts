import { Injectable } from '@nestjs/common';
import { CreateEndpointDto } from './dto/create-endpoint.dto';
import { UpdateEndpointDto } from './dto/update-endpoint.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EndpointModel } from './models/endpoint.model';
import { Repository } from 'typeorm';

@Injectable()
export class EndpointsService {
  constructor(
    @InjectRepository(EndpointModel)
    private readonly endpointRepository: Repository<EndpointModel>
  ) {}

  create(createEndpointDto: CreateEndpointDto) {
    this.endpointRepository.create(createEndpointDto)
  }

  findAll() {
    return this.endpointRepository.find();
  }

  findOne(id: number) {
    return this.endpointRepository.findOne({where: {id}});
  }

  update(id: number, updateEndpointDto: UpdateEndpointDto) {
    this.endpointRepository.update(id, updateEndpointDto)
  }

  async remove(id: number) {
    const endpoint = await this.endpointRepository.findOne({where: {id}})
    this.endpointRepository.remove(endpoint);
  }
}
