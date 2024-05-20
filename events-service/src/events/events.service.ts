import { Injectable } from '@nestjs/common';
import { SendEventDto } from './dto/send-event.dto';

@Injectable()
export class EventsService {

    async send(sendEventDto: SendEventDto) {
        return null;
    }
}
