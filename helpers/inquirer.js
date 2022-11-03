import inquirer from "inquirer";
import Color from 'colors'





const question = [
  {
    type: "list",
    name: "option",
    message: "what do you want to do?\n",
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Searching city`,
      },
      {
        value: 2,
        name: `${'2.'.green} History`,
      },
      {
        value: 0,
        name: `${'0.'.green} Exit`,
      },
      
    ],
  },
];

export const menu = async () => {

  console.clear();

  console.log("==========================".green);
  console.log("          Menu            ");
  console.log("==========================\n".green);

  const { option } = await inquirer.prompt(question);

  return option;
};

export const pause = async () => {

  const questionContinue = [
    {
      type: "input",
      name: "desc",
      message: "Press ENTER to continue".green,
    },
  ];
  console.log("\n");

  await inquirer.prompt(questionContinue);
};

export const readInput = async (message) => {

  console.clear()

  const question = [

    {
      type: "input",
      name: "description",
      message,

      validate(value) {

        if (value.length === 0) {

          return "Please write todo";
        } else {
          return true;
        }
      },
    },
  ];

  const { description } = await inquirer.prompt(question)

  return description;
};

export const listDeleteTodos = async (todos = []) => {

  const choices = todos.map((todo, i) => {
    const index = i + 1
    return {

      value: todo.id,
      name: `${index} ${todo.description}`
    }

  })
  choices.unshift({
    value: '0', name: '0' + ' ' + 'Cancel'.red
  })
  const question = [
    {
      type: 'list',
      name: 'id',
      message: 'choose todo to delete\n',
      choices
    }
  ]

  const { id } = await inquirer.prompt(question);
  return id



  // {
  //   value: "1",
  //   name: `${'1.'.green} Create todo`,
  // }


}
export const confirm = async (message) => {

  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,

    }
  ]
  const { ok } = await inquirer.prompt(question);
  return ok

}
export const checkList = async (todos = []) => {

  const choices = todos.map((todo, i) => {
    const index = i + 1
    return {

      value: todo.id,
      name: `${index} ${todo.description}`,
      checked: (todo.createdDate) ? true : false
    }

  })
 
  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'choose to check\n',
      choices
    }
  ]

  const { ids } = await inquirer.prompt(question);
  return ids



  // {
  //   value: "1",
  //   name: `${'1.'.green} Create todo`,
  // }


}