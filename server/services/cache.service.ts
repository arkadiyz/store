import { PrismaClient } from '@prisma/client';
import loggerService from './logger.service';

const prisma = new PrismaClient();

let productTypesCache: { id: number; name: string }[] = [];

export async function loadProductTypesToCache() {
  productTypesCache = await prisma.productType.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  loggerService.info('🔄 Product types cached:' + productTypesCache.length);
}

export function getProductTypesFromCache() {
  return productTypesCache;
}
