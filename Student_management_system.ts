#! /usr/bin/env node


import inquirer from "inquirer";

import chalk from "chalk";

console.log(chalk.rgb(255,255,0)("\n\t WELCOME  TO  STUDENT  MANAGEMENT  SYSTEM\n "));


class Student{

    static counter = 1

    id : number;

    name : string;

    courses : string[];

    balance : number ;

    constructor(name : string){

        this.id = Student.counter++;"";

        this.name = name;

        this.courses = []    //initlization an empty for courses

        this.balance = 50
    }

 // method to enroll a student in courses

 enroll_course(course : string){

    this.courses.push(course)

 }
    
// method to view a student balance 

view_balance(){

    console.log(chalk.rgb(255,0,255)(`\nBALANCE FOR ${this.name} : ${this.balance}\n`));
    
}

// method to pay student fees 

pay_fees(amount : number){

    this.balance -= amount;

    console.log(chalk.rgb(218,165,32)(`\n$${amount} FEES  PAID SUCCESSFULLY FOR ${this.name}`));
    console.log(chalk.rgb(255,0,0)(`\nREMAINING BALANCE : $${this.balance}\n`));
    

}

show_status(){

console.log(chalk.rgb(194,28,255)(`\nID : ${this.id}\n`));

console.log(chalk.rgb(0,255,255)(`\nNAME : ${this.name} \n`));

console.log(chalk.rgb(0,255,127)(`\nCOURSES : ${this.courses}\n`));

console.log(chalk.rgb(255,215,0)(`\nBALANCE : ${this.balance}\n`));

}

}

//defining A  student manger class to manage student

class student_manager{

    students : Student[]

    constructor(){

        this.students = []
    }

    // method to add a new student

    add_student(name: string){

    let student = new Student(name);

    this.students.push(student)

    console.log(chalk.rgb(255,228,181)(`\nSTUDENT : ${name} ADDED SUCCESSFULLY. STUDENT ID: ${student.id}\n`));
    }

    // method to enroll student

    enroll_student(student_id : number, oourse : string){

        let student = 
        
        this.find_student(student_id)

        if (student) {
            
        student.enroll_course(oourse)

        console.log(chalk.rgb(169,255,94)(` \n${student.name} ENROLL IN ${oourse} SUCCESSFULLY\n`));

        }
    }
 
    // Method to view a  student  Balancee.

    view_Student_balance(student_id : number){

    let student = this.find_student(student_id)
        
    if (student) {
        
    student.view_balance()

    }

    else {

console.log(chalk.rgb(255,8,41)("\n THE STUDENT NOT FOUND. PLEASE ENTER A CORRECT TO STUDENT ID\n"));


    }

    }

    // Method to pay a student fees.

    pay_student_fees(student_id : number, amount : number){

    let student = this.find_student(student_id)

    if (student) {
        
    student.pay_fees(amount); 

}

    else{

        console.log(chalk.rgb(255,8,41)("\n STUDENT NOT FOUND. PLEASE ENTER A CORRECT STUDENT ID\n"));
        
    }

    }

    // Method to display student Statuss

    show_student_status(student_id : number){

    let student = this.find_student(student_id)

    if (student) {

    student.show_status()

    }

    else{

        console.log(chalk.rgb(255,8,41)("\nSTUDENT NOT FOUND. PLEASE ENTER A CORRECT STUDENT ID\n"));

    }


    }

    // Message to find a student by a student ID.

    find_student(student_id : number){

        return this.students.find(student => student.id === student_id )
    }

}

// Main function to run a program.

async function main() {
    
 let manager = new student_manager()

 // while to keep program running.

    while (true) {
        
    let choice = await inquirer.prompt([

        {

        name : "choice",

        type : "list",

        message  : "\nSELECT AN OPTION\n",

        choices : [

            "Add Student",

            "Enroll Student",

            "View Student Balance",

            "Pay Student Fees",

            "Show Student Status",

            "Exit"

        ]

    }
])

// USING SWITCH CASE TO HANDLE USER CHOICE.

switch (choice.choice) {

    case "Add Student":

        let name_input = await inquirer.prompt([
            
            {
                name: "name",

                type: "input",

                message: "\nENTER STUDENT NAME"

            }

        ]);
    
        if (!name_input.name) {

            console.log(chalk.rgb(255,8,41)("\nPLEASE ENTER A STUDENT NAME FIRST."));

            break;

        }
    
        manager.add_student(name_input.name);
        break;
    

    case "Enroll Student" : 

    let course_input = await inquirer.prompt([

        {

        name : "student_id",

        type : "number",

        message : "\nENTER STUDENT ID"

        },

        {

        name : "course",

        type : "input",

        message : "\nENTER COURSE NAME"

        }

    ])

    manager.enroll_student(course_input.student_id, course_input.course);

  if (!course_input.course) {

        console.log(chalk.rgb(255,8,41)("\nPLEASE ENTER A STUDENT ID AND NAME FIRST.\n"));
        
    }
    break;

    case "View Student Balance" :

    let balance_input = await inquirer.prompt([

        {

        name : "student_id",

        type : "number",

        message : "\nENTER A STUDENT ID"

        }

    ])

    manager.view_Student_balance(balance_input.student_id);

    break;

    case "Pay Student Fees" :

    let fees_input = await inquirer.prompt([

        {

        name : "student_id",

        type : "number",

        message : "\nENTER A STUDENT ID"

        },

        {

        name : "amount",

        type : "number",

        message : "\nENTER  A AMOUNT"

        }

    ])

    manager.pay_student_fees(fees_input.student_id, fees_input.amount);

    break

    case "Show Student Status" :

    let status_input = await inquirer.prompt([

        {

        name : "student_id",

        type : "number",

        message : "\nENTER A STUDENT ID"

        }

    ])
    manager.show_student_status(status_input.student_id);

    break

    case "Exit" :
 
           
        console.log(chalk.rgb(189,183,107)(`     \nPRESENTING  BY  ABDUL  REHMAN    \n`));
            

    process.exit(0);

    

}
}

}

// calling a main function

main()
