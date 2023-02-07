const initializeServices = require('../../helpers/initializeServices.js');

describe('timeTableTest', () => {
  test('Should delete timetable', async () => {
    const {taskService, timeTableService} = initializeServices();
    let timeTableDocument1 = await timeTableService.create('Timetable 1');
    let timeTableDocument2 = await timeTableService.create('Timetable 2');
    let name1 = "first";
    let name2 = "second";
    let name3 = "third";
    let name4 = "fourth";
    let description = "some description"


    await taskService.create({ttID: timeTableDocument1._id, name: name1, description})
    await taskService.create({ttID: timeTableDocument1._id, name: name2, description});
    await taskService.create({ttID: timeTableDocument2._id, name: name3, description});
    await taskService.create({ttID: timeTableDocument2._id, name: name4, description});

    // await timeTableService.deleteByID(timeTableDocument2._id);

    const tasks1 = await taskService.getTasks(timeTableDocument1._id);
    const tasks2 = await taskService.getTasks(timeTableDocument2._id);

    // expect(tasks1.length).toBe(2);
    expect(tasks2.length).toBe(2);

  })


})