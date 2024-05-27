import { Injectable } from '@nestjs/common';
import { CreateEndpointDto } from './dto/create-endpoint.dto';
import { UpdateEndpointDto } from './dto/update-endpoint.dto';
import { EndpointModel } from './models/endpoint.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class EndpointsService {
  constructor(
    @InjectModel(EndpointModel)
    private readonly endpointModel: typeof EndpointModel
  ) {}

  async create(createEndpointDto: CreateEndpointDto) {
    return await this.endpointModel.create(createEndpointDto)
  }

  findAll() {
    return this.endpointModel.findAll();
  }

  findOne(id: number) {
    return this.endpointModel.findByPk(id);
  }

  async update(id: number, updateEndpointDto: UpdateEndpointDto) {
    const endpoint = await this.endpointModel.findByPk(id);
    await endpoint.update(updateEndpointDto);
    return endpoint
  }

  async remove(id: number) {
    const endpoint = await this.endpointModel.findOne({where: {id}})
    endpoint.destroy()
  }
}
