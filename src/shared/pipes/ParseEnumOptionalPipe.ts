import { ArgumentMetadata, ParseEnumPipe } from '@nestjs/common';

export class ParseEnumOptionalPipe<T = any> extends ParseEnumPipe<T> {
  transform(value: T, metadata: ArgumentMetadata): Promise<T> {
    if (!value) return;

    return super.transform(value, metadata);
  }
}
