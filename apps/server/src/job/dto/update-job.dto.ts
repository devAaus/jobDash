import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Location, JobLevel } from './create-job.dto'; // Importing the enums

export class UpdateJobDto extends PartialType(CreateJobDto) {

   @ApiPropertyOptional({
      description: 'Job title (optional)',
      example: 'Senior Software Engineer',
   })
   title?: string;

   @ApiPropertyOptional({
      description: 'Job description (optional)',
      example: 'We are looking for a Senior Software Engineer to join our team...',
   })
   desc?: string;

   @ApiPropertyOptional({
      description: 'Company name (optional)',
      example: 'TechCorp',
   })
   compName?: string;

   @ApiPropertyOptional({
      description: 'Company address (optional)',
      example: '123 Main St, Anytown, USA',
   })
   compAddress?: string;

   @ApiPropertyOptional({
      description: 'Job location (optional) - REMOTE, ONSITE, HYBRID',
      enum: Location,
      example: Location.REMOTE,
      enumName: 'Location',
   })
   location?: Location;

   @ApiPropertyOptional({
      description: 'Job level (optional) - ENTRY, JUNIOR, MID, SENIOR',
      enum: JobLevel,
      example: JobLevel.ENTRY,
      enumName: 'JobLevel',
   })
   level?: JobLevel;

   @ApiPropertyOptional({
      description: 'Job experience required (optional)',
      example: '5+ years of experience',
   })
   experience?: string;

   @ApiPropertyOptional({
      description: 'Job skills required (optional)',
      example: 'Python, JavaScript, React, Node.js',
   })
   skills?: string;

   @ApiPropertyOptional({
      description: 'Job salary range (optional)',
      example: '$80,000 - $120,000',
   })
   salary?: string;

   @ApiPropertyOptional({
      description: 'Job expiry date (optional)',
      example: '2023-01-01',
   })
   expiryDate?: string;
}