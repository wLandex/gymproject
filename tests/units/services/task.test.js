const TimeTableService = require('../../../services/timeTable.js')
const TaskService = require('../../../services/task.js')

const taskMock = require('../mocks/entities/classes/taskMock.js')
const timeTableMock = require('../mocks/entities/classes/timeTableMock.js')

const taskService = new TaskService(timeTableMock, taskMock);
const timeTableService = new TimeTableService(timeTableMock, taskMock);


describe("Task test", () => {
  let timeTableDocument
  beforeEach(async () => {
    timeTableDocument = await timeTableService.create('Timetable 1');
  })

  //TODO 123
  test("Should create task", async () => {
    let name = "name1fsdf";
    let description = "hello dfgdfg"
    let result = await taskService.create({ttID: timeTableDocument._id, name, description})
    expect(result.timeTableID).toBe(timeTableDocument._id);
    expect(result.name).toBe(name);
    expect(result.description).toBe(description);
    expect(result._id).toBeDefined();
    expect(typeof result._id).toBe("string");
  })
  test("Should return task", () => {


  })


})