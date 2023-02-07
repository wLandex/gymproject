const initializeServices = require('../../helpers/initializeServices.js')


describe("Task test", () => {


  //TODO 123
  test("Should create task", async () => {
    const {taskService, timeTableService} = initializeServices()
    let name = "name";
    let description = "desc";
    let timeTableDocument = await timeTableService.create('Timetable 1');
    let createdTask = await taskService.create({ttID: timeTableDocument._id, name, description})

    expect(createdTask.timeTableID).toBe(timeTableDocument._id);
    expect(createdTask.name).toBe(name);
    expect(createdTask.description).toBe(description);
    expect(createdTask._id).toBeDefined();
    expect(typeof createdTask._id).toBe("string");
  })

  test("Should return tasks", async () => {
    const {taskService, timeTableService} = initializeServices()
    let timeTableDocument = await timeTableService.create('Timetable 1');
    let name1 = "first";
    let name2 = "second";
    let name3 = "third";
    let description = "some description"
    await taskService.create({ttID: timeTableDocument._id, name: name1, description})
    await taskService.create({ttID: timeTableDocument._id, name: name2, description});
    await taskService.create({ttID: timeTableDocument._id, name: name3, description});
    let tasks = await taskService.getTasks(timeTableDocument._id);
    expect(tasks).toBeTruthy();
    expect(tasks.length).toBe(3);
    expect(tasks[0].name).toBe(name1);
    expect(tasks[1].name).toBe(name2);
    expect(tasks[2].name).toBe(name3);
  })

  // test("Should return task", async () => {
  //   let task = await taskService.getTaskByID(createdTask.timeTableID, createdTask._id);
  //   expect(task).toBeDefined();
  //   expect(task._id).toBe(createdTask._id);
  //   expect(task.name).toBe(createdTask.name);
  //   expect(task.description).toBe(createdTask.description);
  //   expect(task.timeTableID).toBe(createdTask.timeTableID);
  // })
  // test("Should change task", async () => {
  //   let name = "another name";
  //   let description = "another description";
  //   let result = await taskService.changeTaskByID(createdTask._id, name, description);
  //   console.log(result);
  //
  //
  // })


})