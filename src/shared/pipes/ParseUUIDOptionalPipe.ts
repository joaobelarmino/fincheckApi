import { ArgumentMetadata, ParseUUIDPipe } from '@nestjs/common';

export class ParseUUIDOptionalPipe extends ParseUUIDPipe {
  transform(value: string, metadata: ArgumentMetadata): Promise<string> {
    if (!value) return;

    return super.transform(value, metadata);
  }
}
