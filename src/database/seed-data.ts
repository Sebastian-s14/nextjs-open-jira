interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string
    status: string
    createdAt: number
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'example description',
            createdAt: Date.now(),
            status: 'pending',
        },
        {
            description: 'example description 2',
            createdAt: Date.now() - 1000000,
            status: 'in-progress',
        },
        {
            description: 'example description 3',
            createdAt: Date.now() - 100000,
            status: 'finished',
        },
    ],
}
