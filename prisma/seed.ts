import { PrismaClient, ProductType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    const products = [
        {
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
            faq: {
                "Can I prepay?": "Yes, with no extra charges.",
                "Is insurance mandatory?": "No, it is optional."
            },
            terms: {
                "Late fee": "2% of overdue amount",
                "Foreclosure charges": "NIL"
            }
        },
        {
            name: 'Future Scholar Education Loan',
            bank: 'EduFinance Corp',
            type: ProductType.education,
            rate_apr: 8.5,
            min_income: 0,
            min_credit_score: 650,
            tenure_min_months: 24,
            tenure_max_months: 120,
            processing_fee_pct: 0.5,
            prepayment_allowed: true,
            disbursal_speed: '7 days',
            docs_level: 'High',
            summary: 'Comprehensive funding for higher education.',
            faq: {
                "Does it cover tuition?": "Yes, 100% of tuition fees allowed.",
                "Is there a moratorium?": "Yes, course duration + 1 year."
            },
            terms: {
                "Co-applicant": "Mandatory for loans above 5L",
                "Repayment holiday": "Available"
            }
        },
        {
            name: 'Dream Ride Auto Loan',
            bank: 'Velocity Bank',
            type: ProductType.vehicle,
            rate_apr: 9.25,
            min_income: 30000,
            min_credit_score: 680,
            tenure_min_months: 12,
            tenure_max_months: 84,
            processing_fee_pct: 0.75,
            prepayment_allowed: false,
            disbursal_speed: '48 hours',
            docs_level: 'Medium',
            summary: 'Get behind the wheel of your dream car faster.',
            faq: {
                "Is down payment required?": "Yes, minimum 15%.",
                "Can I buy a used car?": "Yes, up to 5 years old."
            },
            terms: {
                "Hypothecation": "Required until loan closure",
                "Insurance": "Comprehensive insurance mandatory"
            }
        },
        {
            name: 'Sweet Home Mortgage',
            bank: 'Secure Hearth Bank',
            type: ProductType.home,
            rate_apr: 6.9,
            min_income: 60000,
            min_credit_score: 720,
            tenure_min_months: 60,
            tenure_max_months: 360,
            processing_fee_pct: 0.25,
            prepayment_allowed: true,
            disbursal_speed: '15 days',
            docs_level: 'Very High',
            summary: 'Affordable home loans with long tenures.',
            faq: {
                "Is property insurance needed?": "Yes.",
                "Can I balance transfer?": "Yes, after 1 year."
            },
            terms: {
                "LTV Ratio": "Up to 80% of property value",
                "Processing fee": "Non-refundable"
            }
        }
    ];

    for (const p of products) {
        const product = await prisma.product.create({
            data: p
        });
        console.log(`Created product: ${product.name} (${product.id})`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
