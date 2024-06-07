#!/usr/bin/env node

import inquirer from "inquirer";

// Create class
class Student {
    name: string;
    constructor(n: string) {
        this.name = n;
    }
}

// User input
class Person {
    students: Student[] = [];
    addStudent(obj: Student) {
        this.students.push(obj);
    }
}

const person = new Person();

const programStart = async (person: Person) => {
    do {
        console.log("Welcome!");

        const { select } = await inquirer.prompt([
            {
                name: "select",
                type: "list",
                message: "Whom would you like to interact with?",
                choices: ["staff", "student", "exit"]
            }
        ]);

        if (select === "staff") {
            console.log("You approach the staffroom. Please feel free to ask any question.");
        } else if (select === "student") {
            const { student } = await inquirer.prompt([
                {
                    name: "student",
                    type: "input",
                    message: "Enter the student's name you wish to engage with:"
                }
            ]);

            const existingStudent = person.students.find(val => val.name === student);

            if (!existingStudent) {
                const newStudent = new Student(student);
                person.addStudent(newStudent);
                console.log(`Hello, I am ${newStudent.name}. Nice to meet you!`);
                console.log("New student added");
            } else {
                console.log(`Hello, I am ${existingStudent.name}. Nice to see you again!`);
            }

            // Sort and display student names alphabetically
            const sortedStudents = person.students.map(student => student.name).sort();
            console.log("Current student list:");
            console.log(sortedStudents);
        } else if (select === "exit") {
            console.log("Exiting the program.");
            process.exit();
        }
    } while (true);
};

programStart(person);