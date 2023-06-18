export default [
  {
    flagId: 1, 
    name: 'spain',
    orientation: 'horizontal', 
    lines: [
      {colorId: 1, color: 'red'},
      {colorId: 2, color: 'yellow'},
      {colorId: 3, color: 'yellow'},
      {colorId: 4, color: 'red'}
    ]
  },
  {
    flagId: 2,
    name: 'germany',
    orientation: 'horizontal',
    lines: [
      {colorId: 1, color: 'black'},
      {colorId: 2, color: 'red'},
      {colorId: 3, color: 'yellow'}
    ]
  },
  {
    flagId: 3,
    name: 'france',
    orientation: 'vertical',
    lines: [
      {colorId: 1, color: 'blue'},
      {colorId: 2, color: 'white'},
      {colorId: 3, color: 'red'}
    ]
  },
  {
    flagId: 4,
    name: 'japan',
    orientation: 'horizontal',
    lines: [
      { colorId: 1, color: 'white', circle: { color: 'red', size: '90px' } }
    ]
  },
  {
    flagId: 5,
    name: 'argentina',
    orientation: 'horizontal',
    lines: [
      {colorId: 1, color: 'cyan'},
      {colorId: 2, color: 'white', circle: {color: 'yellow', size: '30px'} },
      {colorId: 3, color: 'cyan'}
    ]
  }
];
