import { PrismaClient, ProductType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    const product = await prisma.product.create({
        data: {
            name: 'Super Saver Personal Loan',
            bank: 'Global Bank',
            type: ProductType.personal,
            rate_apr: 12.5,
            min_income: 50000,
            min_credit_score: 700,
            tenure_min_months: 12,
            tenure_max_months: 60,
            processing_fee_pct: 1.0,
            prepayment_allowed: true,
            disbursal_speed: '24 hours',
            docs_level: 'Minimal',
            summary: 'A great loan for personal needs.',
            faq: {},
            terms: {}
        }
    });

    console.log('Created product:', product.id);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
