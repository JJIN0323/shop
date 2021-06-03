const categoryList = [
    {
        '_id': 1,
        'name': 'Chair',
    },
    {
        '_id': 2,
        'name': 'Plant',
    },
    {
        '_id': 3,
        'name': 'ETC',
    }
]

const price = [
    {
        '_id': '0',
        'name': 'Any',
        'array': []
    },
    {
        '_id': '1',
        'name': '0 to 20,000',
        'array': [0, 20000]
    },
    {
        '_id': '2',
        'name': '20,000 to 40,000',
        'array': [20000, 40000]
    },
    {
        '_id': '3',
        'name': '40,000 to 60,000',
        'array': [40000, 60000]
    },
    {
        '_id': '4',
        'name': '60,000 to 80,000',
        'array': [60000, 80000]
    },
    {
        '_id': '5',
        'name': '80,000 to 100,000',
        'array': [80000, 100000]
    },
    {
        '_id': '6',
        'name': 'More than 100,000',
        'array': [100000, 100000000000000]
    }
]

export { categoryList, price }