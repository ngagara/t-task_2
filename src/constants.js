export const ROUTES = [
    { 
      id: 1, 
      route: 'из A в B', 
      price: 700, 
      minutes: 50, 
      //время по мск
      time: ['18:00', '18:30', '18:45', '19:00', '19:15', '21:00'] 
    },
    { 
      id: 2, 
      route: 'из B в A', 
      price: 700, 
      minutes: 50, 
      time: ['18:30', '18:45', '19:00', '19:15', '19:35', '21:50', '21:55'] 
    },
    { 
      id: 3, 
      route: 'из A в B и обратно в А', 
      price: 1200, 
      minutes: 100,
      times: 
       {
        a: ['18:00', '18:30', '18:45', '19:00', '19:15', '21:00'],
        b: ['18:30', '18:45', '19:00', '19:15', '19:35', '21:50', '21:55']
       } 
    }
  ];
  
  export const DEFAULT_VALUE = {
    route: 'из A в B',
    tickets: 0,
    price: 700,
    minutes: 50,
    dispatch_moscow_time_b: '18:30',
    dispatch_moscow_time: '18:00',
    local_dispatch_time: null,
    local_arrival_time: null
  };
  