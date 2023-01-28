function Person(foo, bar, age, gender) {
  this.foo = foo;
  this.bar = bar;
  this.age = age;
  this.gender = gender;
}

Person.prototype.eat = function() {
  console.log('Eating');
};

Person.prototype.communicate = function() {
  console.log('Communicating');
};

Person.prototype.sleep = function() {
  console.log('Sleeping');
}

Person.prototype.fullName = function() {
  return this.foo + " " + this.bar;
}

function Doctor(foo, bar, age, gender, specialization) {
  Person.call(this, foo, bar, age, gender);
  this.specialization = specialization;
}
//This is equivalent to 'extends' in ES6
Doctor.prototype = Object.create(Person.prototype);
//This allows for typeof to be used
Doctor.prototype.constructor = Doctor;

Doctor.prototype.diagnose = function() {
  console.log("Diagnosing");
};

function Professor(foo, bar, age, gender, subject) {
  Person.call(this, foo, bar, age, gender);
  this.subject = subject;
}

Professor.prototype = Object.create(Person.prototype);
Professor.prototype.constructor = Professor;

Professor.prototype.teach = function() {
  console.log("Teaching");
}

function Student(foo, bar, age, gender, undergrad) {
  Person.call(this, foo, bar, age, gender);
  this.undergrad = undergrad;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function() {
  console.log("Studying");
}

function GraduateStudent(foo, bar, age, gender, undergrad, masters) {
  Student.call(this, foo, bar, age, gender, undergrad);
  this.masters = masters;
};

GraduateStudent.prototype = Object.create(Student.prototype);
GraduateStudent.prototype.constructor = GraduateStudent;

GraduateStudent.prototype.research = function() {
  console.log("Researching");
};


let person = new Person('foo', 'bar', 21, 'gender');
console.log(person instanceof Person);     // logs true
person.eat();                              // logs 'Eating'
person.communicate();                      // logs 'Communicating'
person.sleep();                            // logs 'Sleeping'
console.log(person.fullName());            // logs 'foo bar'

let doctor = new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics');
console.log(doctor instanceof Person);     // logs true
console.log(doctor instanceof Doctor);     // logs true
doctor.eat();                              // logs 'Eating'
doctor.communicate();                      // logs 'Communicating'
doctor.sleep();                            // logs 'Sleeping'
console.log(doctor.fullName());            // logs 'foo bar'
doctor.diagnose();                         // logs 'Diagnosing'

let graduateStudent = new GraduateStudent('foo', 'bar', 21, 'gender', 'BS Industrial Engineering', 'MS Industrial Engineering');
// logs true for next three statements
console.log(graduateStudent instanceof Person);
console.log(graduateStudent instanceof Student);
console.log(graduateStudent instanceof GraduateStudent);
graduateStudent.eat();                     // logs 'Eating'
graduateStudent.communicate();             // logs 'Communicating'
graduateStudent.sleep();                   // logs 'Sleeping'
console.log(graduateStudent.fullName());   // logs 'foo bar'
graduateStudent.study();                   // logs 'Studying'
graduateStudent.research();                // logs 'Researching'