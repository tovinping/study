class Group {
  groupName: string;
  groupId: string;
  owner: string;
  constructor() {
    this.groupName = "GroupName";
    this.groupId = "GroupId";
    this.owner = "GroupOwner";
  }
  isGroup(): this is Group {
    return true;
  }
  isEmployee() {
    return false;
  }
}
class Employee {
  account: string;
  name: string;
  age: number;
  constructor() {
    this.account = "EmployeeID";
    this.name = "EmployeeName";
    this.age = 33;
  }
  isEmployee(): this is Employee {
    return true;
  }
  isGroup() {
    return false;
  }
}

class Chat<T = Employee | Group> {
  chatId: string;
  unreadCount: number;
  lastMsgId: string;
  target: T;
  constructor(target: T) {
    this.chatId = "c";
    this.unreadCount = 1;
    this.lastMsgId = "s";
		this.target = target
  }
}
export function assertGroup(data: Employee | Group): data is Group {
  if ("groupId" in data) {
   return true
  }
	return false
}

export function getName(data: Chat) {
	if (assertGroup(data.target)){
		console.log(data.target.groupName);
	}

  // two
  if (data.target.isGroup()) {
    console.log("2=" + data.target.groupName);
  } else {
    console.log('3=' + data.target.account)
  }
}
export function getGroupChatName(data: Chat<Group>) {
	console.log('6=' + data.target.groupName)
}
const chat = new Chat(new Employee);
getName(chat);
getGroupChatName(new Chat(new Group))
