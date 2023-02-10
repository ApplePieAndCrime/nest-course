import { DevelopHelpersService } from './develop-helpers.service';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Developer helpers')
@Controller('develop-helpers')
export class DevelopHelpersController {
  constructor(private developHelpersService: DevelopHelpersService) {}

  @ApiOperation({ summary: 'Создать базовый сет моделей' })
  @Get('/create-defaults')
  createDefaults() {
    return this.developHelpersService.createDefaults();
  }
}
