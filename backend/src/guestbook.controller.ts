import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Get()
  getAll() {
    return this.guestbookService.getMessages();
  }

  @Post()
  create(@Body() body: { name: string; message: string }) {
    return this.guestbookService.createMessage(body.name, body.message);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { message: string }) {
    return this.guestbookService.updateMessage(Number(id), body.message);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guestbookService.deleteMessage(Number(id));
  }
}