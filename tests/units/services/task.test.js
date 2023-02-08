const initializeServices = require('../../helpers/initializeServices.js')


describe("Task test", () => {

  let name1 = "first";
  let name2 = "second";
  let name3 = "third";
  let name4 = "fourth";
  let ttName1 = "Timetable 1";
  let ttName2 = "Timetable 2";
  let ttName3 = "Timetable 3"
  let ttName4 = "Timetable 4";
  let description = "Some description";

  //TODO 123
  test("Should create tasks", async () => {
    const {taskService, timeTableService} = initializeServices()
    let timeTableDocument1 = await timeTableService.create(ttName1);
    let timeTableDocument2 = await timeTableService.create(ttName2);

    let createdTask1 = await taskService.create({ttID: timeTableDocument1._id, name: name1, description})
    let createdTask2 = await taskService.create({ttID: timeTableDocument1._id, name: name2, description})
    let createdTask3 = await taskService.create({ttID: timeTableDocument2._id, name: name3, description})
    let createdTask4 = await taskService.create({ttID: timeTableDocument2._id, name: name4, description})

    let tasks1 = await taskService.getTasks(timeTableDocument1._id);
    let tasks2 = await taskService.getTasks(timeTableDocument2._id);

    expect(tasks1.length).toBe(2);
    expect(tasks2.length).toBe(2);

    expect(tasks1[0].name).toBe(name1);
    expect(tasks1[0].timeTableID).toBe(createdTask1.timeTableID);

    expect(tasks1[1].name).toBe(name2);
    expect(tasks1[1].timeTableID).toBe(createdTask2.timeTableID);

    expect(tasks2[0].name).toBe(name3);
    expect(tasks2[0].timeTableID).toBe(createdTask3.timeTableID);

    expect(tasks2[1].name).toBe(name4);
    expect(tasks2[1].timeTableID).toBe(createdTask4.timeTableID);

    expect(createdTask1._id).toBeDefined();
    expect(createdTask1.name).toBeDefined();
    expect(typeof createdTask1._id).toBe("string");
  })
  test('Should get tasks', async () => {
    const {taskService, timeTableService} = initializeServices()
    let timeTableDocument1 = await timeTableService.create(ttName1);

    expect((await taskService.getTasks(timeTableDocument1._id)).length).toBe(0);

    await taskService.create({ttID: timeTableDocument1._id, name: name1, description})
    expect((await taskService.getTasks(timeTableDocument1._id)).length).toBe(1);

    await taskService.create({ttID: timeTableDocument1._id, name: name2, description})
    expect((await taskService.getTasks(timeTableDocument1._id)).length).toBe(2);

    await taskService.create({ttID: timeTableDocument1._id, name: name3, description})
    expect((await taskService.getTasks(timeTableDocument1._id)).length).toBe(3);

    await taskService.create({ttID: timeTableDocument1._id, name: name4, description})
    expect((await taskService.getTasks(timeTableDocument1._id)).length).toBe(4);
  })

  test('Should delete tasks', async () => {
    const {taskService, timeTableService} = initializeServices()
    let timeTableDocument1 = await timeTableService.create(ttName1);
    let timeTableDocument2 = await timeTableService.create(ttName2);

    let createdTask1 = await taskService.create({ttID: timeTableDocument1._id, name: name1, description})
    let createdTask2 = await taskService.create({ttID: timeTableDocument1._id, name: name2, description})
    let createdTask3 = await taskService.create({ttID: timeTableDocument2._id, name: name3, description})
    let createdTask4 = await taskService.create({ttID: timeTableDocument2._id, name: name4, description})

    let tasks1 = await taskService.getTasks(timeTableDocument1._id);
    let tasks2 = await taskService.getTasks(timeTableDocument2._id);

    expect(tasks1.length).toBe(2);
    expect(tasks2.length).toBe(2);

    await taskService.deleteTasks(timeTableDocument2._id);

    tasks1 = await taskService.getTasks(timeTableDocument1._id);
    tasks2 = await taskService.getTasks(timeTableDocument2._id);

    expect(tasks1.length).toBe(2);
    expect(tasks2.length).toBe(0);

    await taskService.deleteTasks(timeTableDocument1._id);
    tasks1 = await taskService.getTasks(timeTableDocument1._id);
    expect(tasks1.length).toBe(0);


  })
  test("Should get task by ID", async () => {
    const {taskService, timeTableService} = initializeServices()
    let timeTableDocument1 = await timeTableService.create(ttName1);

    await taskService.create({ttID: timeTableDocument1._id, name: name1, description})
    let createdTask = await taskService.create({ttID: timeTableDocument1._id, name: name2, description})
    await taskService.create({ttID: timeTableDocument1._id, name: name3, description})

    let returnedTask = await taskService.getTaskByID(timeTableDocument1._id, createdTask._id);

    expect(returnedTask.name).toBe(name2);
    expect(returnedTask.description).toBe(description);
    expect(returnedTask.timeTableID).toBe(timeTableDocument1._id);


  })

  test("Should delete task by ID", async () => {
    const {taskService, timeTableService} = initializeServices()
    let timeTableDocument1 = await timeTableService.create(ttName1);

    await taskService.create({ttID: timeTableDocument1._id, name: name1, description})
    let createdTask = await taskService.create({ttID: timeTableDocument1._id, name: name2, description})
    await taskService.create({ttID: timeTableDocument1._id, name: name3, description})

    expect((await taskService.getTasks(timeTableDocument1._id)).length).toBe(3);

    let deletedTask = await taskService.deleteTaskByID(createdTask._id);

    expect(deletedTask.name).toBe(createdTask.name);
    expect(deletedTask.description).toBe(createdTask.description);
    expect(deletedTask.id).toBe(createdTask.id);
    expect(deletedTask.timeTableID).toBe(createdTask.timeTableID);

    expect((await taskService.getTasks(timeTableDocument1._id)).length).toBe(2);

  })
  test('Should change task', async () => {

    let newName = 'abcdeee';
    let newDescription = 'qqqqqqqqqqqq';

    const {taskService, timeTableService} = initializeServices()
    let timeTableDocument1 = await timeTableService.create(ttName1);

    await taskService.create({ttID: timeTableDocument1._id, name: name1, description})
    let createdTask = await taskService.create({ttID: timeTableDocument1._id, name: name2, description})
    await taskService.create({ttID: timeTableDocument1._id, name: name3, description})

    await taskService.changeTaskByID(createdTask._id, newName, newDescription);
    expect((await taskService.getTaskByID(timeTableDocument1._id, createdTask._id)).name).toBe(newName);
    expect((await taskService.getTaskByID(timeTableDocument1._id, createdTask._id)).description).toBe(newDescription);
    expect((await taskService.getTasks(timeTableDocument1._id)).length).toBe(3);

  })
  
})