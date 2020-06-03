export interface Todo {
  id: number;
  title: string;
  done: boolean;
  createdAt: Date;
}

export const TodoSchema = {
  name: 'Todo',
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: 'string',
    done: {type: 'bool', default: false},
    createdAt: {type: 'date'},
  },
};
