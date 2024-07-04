import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';

@Controller('reports')
@ApiTags('Reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('total-sold')
  @ApiOkResponse({ type: String })
  @UseGuards(JwtAuthGuard)
  findOne() {
    return this.reportsService.getTotalSold();
  }

  @Get('highest-amount-order')
  @ApiOkResponse({ type: String })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.reportsService.getHighestAmountOrder();
  }
}
