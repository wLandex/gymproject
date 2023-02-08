const initializeServices = require('../../helpers/initializeServices.js');
let name1 = "first";
let name2 = "second";
let name3 = "third";
let name4 = "fourth";
let ttName1 = "Timetable 1";
let ttName2 = "Timetable 2";
let ttName3 = "Timetable 3"
let ttName4 = "Timetable 4";
let description = "some description"

describe('timeTableTest', () => {
  test('Should create timetables', async () => {

    const {timeTableService} = initializeServices();
    let timeTableDocument1 = await timeTableService.create(ttName1);
    expect((await timeTableService.getByID(timeTableDocument1._id)).name).toBe(ttName1);
    expect((await timeTableService.getByID(timeTableDocument1._id))._id).toBe(timeTableDocument1._id);
    expect((await timeTableService.getAll()).length).toBe(1);

    let timeTableDocument2 = await timeTableService.create(ttName2);
    expect((await timeTableService.getByID(timeTableDocument2._id)).name).toBe(ttName2);
    expect((await timeTableService.getByID(timeTableDocument2._id))._id).toBe(timeTableDocument2._id);
    expect((await timeTableService.getAll()).length).toBe(2);

    let timeTableDocument3 = await timeTableService.create(ttName3);
    expect((await timeTableService.getByID(timeTableDocument3._id)).name).toBe(ttName3);
    expect((await timeTableService.getByID(timeTableDocument3._id))._id).toBe(timeTableDocument3._id);

    expect((await timeTableService.getAll()).length).toBe(3);

  })


  test('Should return all timetables', async () => {
    const {timeTableService} = initializeServices()
    expect((await timeTableService.getAll()).length).toBe(0);
    await timeTableService.create(ttName1);
    expect((await timeTableService.getAll()).length).toBe(1);
    await timeTableService.create(ttName2);
    expect((await timeTableService.getAll()).length).toBe(2);
    await timeTableService.create(ttName3);
    expect((await timeTableService.getAll()).length).toBe(3);
  })


  test('Should delete timetable', async () => {
    const {taskService, timeTableService} = initializeServices();
    let timeTableDocument1 = await timeTableService.create(ttName1);
    let timeTableDocument2 = await timeTableService.create(ttName2);
    await taskService.create({ttID: timeTableDocument1._id, name: name1, description})
    await taskService.create({ttID: timeTableDocument1._id, name: name2, description});
    await taskService.create({ttID: timeTableDocument2._id, name: name3, description});
    await taskService.create({ttID: timeTableDocument2._id, name: name4, description});

    await timeTableService.deleteByID(timeTableDocument2._id);

    const tasks1 = await taskService.getTasks(timeTableDocument1._id);
    const tasks2 = await taskService.getTasks(timeTableDocument2._id);

    expect((await timeTableService.getAll()).length).toBe(1);
    expect(tasks1.length).toBe(2)
    expect(tasks2.length).toBe(0)

  })
  test('Should add timetables & get by ID', async () => {
    const {timeTableService} = initializeServices();
    await timeTableService.create(ttName1);
    await timeTableService.create(ttName2);
    let thirdTimeTable = await timeTableService.create(ttName3);
    await timeTableService.create(ttName4);
    expect((await timeTableService.getAll()).length).toBe(4);
    expect((await timeTableService.getByID(thirdTimeTable._id)).name).toBe(ttName3);
    expect((await timeTableService.getByID(thirdTimeTable._id))._id).toBe(thirdTimeTable._id);

  })

  test('Should remove all TimeTables & tasks ', async () => {
    const {taskService, timeTableService} = initializeServices();
    let timeTableDocument1 = await timeTableService.create(ttName1);
    let timeTableDocument2 = await timeTableService.create(ttName2);
    let description = "some description"
    await taskService.create({ttID: timeTableDocument1._id, name: name1, description})
    await taskService.create({ttID: timeTableDocument1._id, name: name2, description});
    await taskService.create({ttID: timeTableDocument2._id, name: name3, description});
    await taskService.create({ttID: timeTableDocument2._id, name: name4, description});

    let tasks1 = await taskService.getTasks(timeTableDocument1._id);
    let tasks2 = await taskService.getTasks(timeTableDocument2._id);
    expect(tasks1.length).toBe(2)
    expect(tasks2.length).toBe(2)

    await timeTableService.delete();

    tasks1 = await taskService.getTasks(timeTableDocument1._id);
    tasks2 = await taskService.getTasks(timeTableDocument2._id);
    expect((await timeTableService.getAll()).length).toBe(0);
    expect(tasks1.length).toBe(0)
    expect(tasks2.length).toBe(0)
  })


})


