const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  'Marketplace-Farm',
  'Marketplace-Post Office',
  'Marketplace-Shop',
  'Marketplace-Town Hall',
  'Shop-Town Hall',
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split('-'))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);
// console.log('🚀  roadGraph:', JSON.stringify(roadGraph, null, 2));

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels
        .map(p => {
          if (p.place != this.place) return p;
          return { place: destination, address: p.address };
        })
        .filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

let first = new VillageState('Post Office', [{ place: 'Post Office', address: "Alice's House" }]);
let next = first.move("Alice's House");

// console.log(next.place);
// → Alice's House
// console.log(next.parcels);
// → []
// console.log(first.place);
// → Post Office

function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      return turn
      // break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}

VillageState.random = function (parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({ place, address });
  }
  return new VillageState('Post Office', parcels);
};

// runRobot(VillageState.random(), randomRobot);

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

// runRobot(VillageState.random(100), routeRobot, []);

function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

// runRobot(VillageState.random(100), goalOrientedRobot, []);

function getAverage (stepCounts) {
  const sum = stepCounts.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  return sum / stepCounts.length
}

function efficientRobot({place, parcels}, route) {
  if (route.length == 0) {
    // Create an array to store all routes
    let routes = [];

    // Calculate the route for every parcel
    for (let parcel of parcels) {
      if (parcel.place != place) {
        route = findRoute(roadGraph, place, parcel.place);
      } else {
        route = findRoute(roadGraph, place, parcel.address);
      }
      routes.push(route);
    }

    // Sort routes array by the route length in ascending order
    routes.sort((a, b) => a.length - b.length);
    console.log('🚀  routes:', routes)

    // Choose the shortest route
    route = routes[0];
  }
  return {direction: route[0], memory: route.slice(1)};
}

// runRobot(VillageState.random(), efficientRobot, []);

function compareRobots(robot1, memory1, robot2, memory2) {
  let robot1StepCounts = []
  let robot2StepCounts = []

  for (let index = 0; index < 100; index++) {
    robot1StepCounts.push(runRobot(VillageState.random(100), robot1, memory1))
    robot2StepCounts.push(runRobot(VillageState.random(100), robot2, memory2))
  }

  let results = {
    robot1AveStepCount: getAverage(robot1StepCounts),
    robot2AveStepCount: getAverage(robot2StepCounts)
  }
  console.log('🚀  results:', results)
  return results
}

// compareRobots(goalOrientedRobot, [], efficientRobot, []);


class PGroup {
  constructor(members) {
    this.members = members;
  }

  add(value) {
    if (this.has(value)) return this;
    return new PGroup(this.members.concat([value]));
  }

  delete(value) {
    if (!this.has(value)) return this;
    return new PGroup(this.members.filter(m => m !== value));
  }

  has(value) {
    return this.members.includes(value);
  }
}

PGroup.empty = new PGroup([]);

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false