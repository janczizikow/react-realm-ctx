import Realm from 'realm';

const TodoSchema = {
  name: 'Todo',
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: 'string',
    done: {type: 'bool', default: false},
    createdAt: {type: 'date'},
  },
};

export default new Realm({schema: [TodoSchema]});
