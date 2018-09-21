const shoppingCarts = [];

const Orders = [
  {
    id: 1,
    orders: [
      {
        timeOrdered: '2018-09-20T20:15:22.360Z',
        foodId: 2,
        quantity: 7,
      },
      {
        timeOrdered: '2018-09-20T20:15:22.360Z',
        foodId: 2,
        quantity: 7,
      },
      {
        timeOrdered: '2018-09-20T20:15:22.360Z',
        foodId: 2,
        quantity: 7,
      }
    ]
  },
];

const menu = [
  {
    food: 'fried chicken',
    foodId: 1,
  },
  {
    food: 'burger',
    foodId: 2,
  },
  {
    food: 'meat pie',
    foodId: 3,
  },
  {
    food: 'pizza',
    foodId: 4,
  },
  {
    food: 'roasted chicken',
    foodId: 5,
  },
];

export {
  Orders,
  menu,
  shoppingCarts,
};
